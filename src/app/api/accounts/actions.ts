"use server";

import { revalidatePath } from "next/cache";
import createPrismaClient from "../../../../prisma/prisma";

// export async function createOrUpdate(formData: FormData) {
//   const prisma = createPrismaClient();

//   // Probably not how I'm supposed to do it, but gonna do it anyway for now.

//   const accountName = formData?.get("groupName") as string;
//   const groupType = formData?.get("groupType") as string;
//   const id = parseInt(formData.get("id") as string);
  
//   if (id != null && !Number.isNaN(id)) {
//     const update = await prisma.group.update({
//       where: {
//         id: id,
//       },
//       data: {
//         groupName: groupName,
//         groupType: groupType,
//       },
//     });
//   } else {
//     const create = await prisma.group.create({
//       data: {
//         groupName: groupName,
//         groupType: groupType,
//         createdById: 1,
//       },
//     });
//   }

//   revalidatePath("/dashboard/budget");
// }

export async function deleteAccount(id: number) {
  const prisma = createPrismaClient();

  const account = await prisma.group.update({
    where: {
      id: id,
    },
    data: {
      isActive: false,
    },
  });

  revalidatePath("/dashboard/budget");
}
