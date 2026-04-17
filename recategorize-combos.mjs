import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Mapping de combos para categorias
const comboCategoryMap = {
  // X-Salada (1)
  "Combo 01": 1, "Combo 02": 1, "Combo 03": 1, "Combo 04": 1,
  "Combo 05": 1, "Combo 06": 1, "Combo 07": 1, "Combo 08": 1,
  "Combo 09": 1, "Combo 10": 1, "Combo 27": 1,
  
  // X-Salada Especial (2)
  "Combo 11": 2, "Combo 12": 2, "Combo 13": 2, "Combo 23": 2,
  
  // Artesanais (3)
  "Combo 24": 3, "Combo 25": 3,
  
  // Kikão (4)
  "Combo 15": 4, "Combo 16": 4, "Combo 17": 4, "Combo 18": 4,
  
  // Pastéis (5)
  "Combo 20": 5, "Combo 21": 5, "Combo 26": 5,
  
  // Mistos (6)
  "Combo 14": 6, "Combo 19": 6, "Combo 22": 6,
};

try {
  for (const [comboName, categoryId] of Object.entries(comboCategoryMap)) {
    await connection.execute(
      "UPDATE menuItems SET categoryId = ? WHERE name LIKE ?",
      [categoryId, `%${comboName}%`]
    );
    console.log(`✓ ${comboName} → Categoria ${categoryId}`);
  }
  
  console.log("\n✅ Todos os combos foram recategorizados!");
  const [result] = await connection.execute("SELECT categoryId, COUNT(*) as count FROM menuItems GROUP BY categoryId");
  console.log("\nResumo por categoria:");
  result.forEach(row => {
    const catNames = { 1: "X-Salada", 2: "X-Salada Especial", 3: "Artesanais", 4: "Kikão", 5: "Pastéis", 6: "Mistos" };
    console.log(`  ${catNames[row.categoryId]}: ${row.count} itens`);
  });
} catch (error) {
  console.error("Erro:", error);
} finally {
  await connection.end();
}
