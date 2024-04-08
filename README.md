model Category {
  id            Int         @id @default(autoincrement())
  name          String
  parentId      Int?        @map("parent_id")
  parent        Category?   @relation("ChildCategories", fields: [parentId], references: [id])
  childCategories Category[] @relation("ChildCategories")
}