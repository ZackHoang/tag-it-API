-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "char1" JSONB NOT NULL,
    "char2" JSONB NOT NULL,
    "char3" JSONB NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);
