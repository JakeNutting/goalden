'use server'

import { revalidatePath } from "next/cache";
import createPrismaClient from "../../../../prisma/prisma";

export async function create(formData: FormData) {
    const prisma = createPrismaClient();

    // Probably not how I'm supposed to do it, but gonna do it anyway for now.

    const groupName = formData.get('groupName');
    const groupType = formData.get('groupType');

    const group = await prisma.group.create({
        data: {
            groupName: groupName as string,
            groupType: groupType as string,
            createdById: 1,
        }
    });
    
    revalidatePath('/dashboard');
}

export async function deleteGroup(groupId: number) {
    const prisma = createPrismaClient();

    const group = await prisma.group.update({
        where: {
            id: groupId
        },
        data: {
            isActive: false
        }
    })

    revalidatePath('/dashboard');
}