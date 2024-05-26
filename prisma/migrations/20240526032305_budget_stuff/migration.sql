-- CreateTable
CREATE TABLE "Accounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accountName" TEXT NOT NULL,
    "accountTypeId" INTEGER NOT NULL,
    "startingAllowance" DECIMAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Accounts_accountTypeId_fkey" FOREIGN KEY ("accountTypeId") REFERENCES "AccountTypes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AccountActivities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ammount" DECIMAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "activityTypeId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "AccountActivities_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AccountActivities_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "ActivityTypes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ActivityTypes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activityName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "AccountTypes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);
