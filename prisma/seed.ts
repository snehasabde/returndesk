import { PrismaClient, RequestStatus, ReturnReason, Resolution } from '@prisma/client';

const prisma = new PrismaClient();

function generateRef(index: number): string {
  return `RET-${10000 + index}`;
}

async function main() {
  await prisma.note.deleteMany({});
  await prisma.returnRequest.deleteMany({});

  const statuses = Object.values(RequestStatus);
  const reasons = Object.values(ReturnReason);

  for (let i = 1; i <= 32; i++) {
    const status = statuses[i % statuses.length];
    const reason = reasons[i % reasons.length];
    let resolution: Resolution | null = null;
    let refundAmount: number | null = null;

    if (status === RequestStatus.APPROVED || status === RequestStatus.COMPLETED) {
      const resTypes = [Resolution.REFUND, Resolution.REPLACEMENT, Resolution.STORE_CREDIT];
      resolution = resTypes[i % resTypes.length];
      if (resolution === Resolution.REFUND) {
        refundAmount = Number((Math.random() * 100 + 10).toFixed(2));
      }
    }

    await prisma.returnRequest.create({
      data: {
        reference: generateRef(i),
        customerName: `Customer ${i}`,
        customerEmail: `customer${i}@example.com`,
        orderId: `ORD-${2000 + (i % 10)}`,
        itemId: `ITEM-${100 + (i % 5)}`,
        quantity: (i % 3) + 1,
        reason,
        status,
        resolution,
        refundAmount,
        isSoftDeleted: false,
        notes: {
          create: [
            { content: `Initial request raised for ${reason}.` },
            ...(i % 2 === 0 ? [{ content: 'Agent reviewed item details.' }] : [])
          ]
        }
      }
    });
  }

  console.log('Database seeded with 32 records across all statuses and reasons.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .then(async () => {
    await prisma.$disconnect();
  });