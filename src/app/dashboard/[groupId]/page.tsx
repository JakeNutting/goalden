import { Button } from "@/components/ui/button";
import { ListTodo, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function ViewGroup({
  params: { groupId },
}: {
  params: { groupId: string };
}) {
  // const prisma = createPrismaClient();

  // const group = await prisma.group.findFirst({
  //   where: {
  //     id: parseInt(groupId),
  //   },
  // });

  // return (
  //   <>
  //     <div className="bg-blue-50 py-20">
  //       <div className="mx-auto max-w-screen-xl px-2 xl:px-0">
  //         <h1 className="text-dark text-3xl font-semibold">
  //           {group?.groupName}
  //         </h1>
  //         <p className="my-1 flex text-lg font-normal">{group?.groupType}</p>
  //         <Badge variant="default" className="bg-gray-500 text-white pointer-events-none"><ListTodo className="mr-2" size={18}></ListTodo>Goals</Badge>
  //       </div>
  //     </div>
  //     <div className="mx-auto max-w-screen-xl px-2 xl:px-0 mt-10">
        
  //       <h6 className="mb-3">You don't have any segments in this group...</h6>
  //       <Button size={"sm"} className="bg-blue-500 hover:bg-blue-600"><Plus className="mr-2" size={16}></Plus>Add Segment</Button>
  //     </div>
  //   </>
  // );
}
