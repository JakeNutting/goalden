-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GroupItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "groupId" INTEGER NOT NULL,
    CONSTRAINT "GroupItem_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GroupItem_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GroupItem" ("createdAt", "createdById", "groupId", "id", "itemName") SELECT "createdAt", "createdById", "groupId", "id", "itemName" FROM "GroupItem";
DROP TABLE "GroupItem";
ALTER TABLE "new_GroupItem" RENAME TO "GroupItem";
CREATE TABLE "new_Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupName" TEXT NOT NULL,
    "groupType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Group_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Group" ("createdAt", "createdById", "groupName", "groupType", "id") SELECT "createdAt", "createdById", "groupName", "groupType", "id" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
