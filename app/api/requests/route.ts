import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { RequestStatus, ReturnReason } from '@prisma/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') as RequestStatus | null;
  const reason = searchParams.get('reason') as ReturnReason | null;
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const order = searchParams.get('order') === 'asc' ? 'asc' : 'desc';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const whereClause: any = {
    isSoftDeleted: false,
    AND: [
      status ? { status } : {},
      reason ? { reason } : {},
      search
        ? {
            OR: [
              { customerName: { contains: search, mode: 'insensitive' } },
              { customerEmail: { contains: search, mode: 'insensitive' } },
              { orderId: { contains: search, mode: 'insensitive' } },
              { reference: { contains: search, mode: 'insensitive' } }
            ]
          }
        : {}
    ]
  };

  const total = await prisma.returnRequest.count({ where: whereClause });
  const items = await prisma.returnRequest.findMany({
    where: whereClause,
    orderBy: { [sortBy]: order },
    skip: (page - 1) * limit,
    take: limit,
    include: { notes: true }
  });

  return NextResponse.json({
    data: items,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, orderId, itemId, quantity, reason } = body;

    if (!customerName || !customerEmail || !orderId || !itemId || !quantity || !reason) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingLive = await prisma.returnRequest.findFirst({
      where: {
        orderId,
        itemId,
        status: { notIn: [RequestStatus.REJECTED, RequestStatus.COMPLETED] },
        isSoftDeleted: false
      }
    });

    if (existingLive) {
      return NextResponse.json(
        { error: 'A live return request already exists for this item on this order.' },
        { status: 409 }
      );
    }

    const count = await prisma.returnRequest.count();
    const reference = `RET-${10001 + count}`;

    const newRequest = await prisma.returnRequest.create({
      data: {
        reference,
        customerName,
        customerEmail,
        orderId,
        itemId,
        quantity: Number(quantity),
        reason,
        notes: { create: [{ content: 'Request initialized.' }] }
      }
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}