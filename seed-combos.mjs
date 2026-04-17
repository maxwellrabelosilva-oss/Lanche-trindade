import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const combos = [
  // Combos de X-Salada
  { category: 'X-Salada', emoji: '🍔', name: 'Combo 01', description: '1 X-Salada + 1 Batata (180ml) + 1 Refri Lata', price: 20.00 },
  { category: 'X-Salada', emoji: '🍔', name: 'Combo 02', description: '2 X-Salada + 1 Coca-Cola (1L)', price: 28.00 },
  { category: 'X-Salada', emoji: '🍔', name: 'Combo 03', description: '3 X-Salada + 1 Regente (1,5L)', price: 30.00 },
  { category: 'X-Salada', emoji: '🍔', name: 'Combo 04', description: '4 X-Salada + 1 Regente (2L)', price: 40.00 },
  { category: 'X-Salada', emoji: '🍔', name: 'Combo 05', description: '5 X-Salada + 1 Batata de 300ml + 1 Coca-Cola (2L)', price: 60.00 },
  { category: 'X-Salada', emoji: '🍔', name: 'Combo 06', description: '6 X-Salada + 1 Coca-Cola (2L)', price: 62.00 },
  { category: 'X-Salada', emoji: '🍔', name: 'Combo 07', description: '8 X-Salada + 1 Coca-Cola (2L)', price: 80.00 },
  { category: 'X-Salada', emoji: '🍔', name: 'Combo 08', description: '10 X-Salada + 1 Coca-Cola (2L)', price: 100.00 },
  { category: 'X-Salada', emoji: '🍔', name: 'Combo 09 Super Promo', description: '3 X-Salada (Apenas os sanduíches)', price: 26.00 },
  { category: 'X-Salada', emoji: '🍔', name: 'Combo 10', description: '3 X-Salada + 1 Coca-Cola (1L)', price: 34.00 },
  { category: 'X-Salada', emoji: '🍔', name: 'Combo 27', description: '3 X-Salada + Batata Frita (300ml) + 1 Refrigerante (1,5L)', price: 36.00 },
  
  // Combos de X-Salada Especial & Outros Burgueres
  { category: 'X-Salada Especial', emoji: '👑', name: 'Combo 11', description: '1 X-Tudo + Batata (300ml) + 1 Coca-Cola Lata', price: 30.00 },
  { category: 'X-Salada Especial', emoji: '👑', name: 'Combo 12', description: '1 X-Salada Especial + Batata (180ml) + 1 Coca-Cola Lata', price: 22.00 },
  { category: 'X-Salada Especial', emoji: '👑', name: 'Combo 13', description: '2 X-Salada Especial + Batata (300ml) + 1 Coca-Cola (1L)', price: 38.00 },
  { category: 'X-Salada Especial', emoji: '👑', name: 'Combo 23', description: '2 X-Salada Especial + 2 Kikão Especial + 1 Coca-Cola (1L)', price: 50.00 },
  
  // Combos Artesanais
  { category: 'Artesanais', emoji: '🧆', name: 'Combo 24', description: '1 Artesanal + 1 Batata (180ml) + 1 Coca-Cola Lata', price: 30.00 },
  { category: 'Artesanais', emoji: '🧆', name: 'Combo 25', description: '2 Artesanais + 1 Batata (300ml) + 1 Coca-Cola (1L)', price: 50.00 },
  
  // Combos de Kikão (Hot Dog)
  { category: 'Kikão', emoji: '🌭', name: 'Combo 15', description: '3 Kikão simples', price: 12.00 },
  { category: 'Kikão', emoji: '🌭', name: 'Combo 16', description: '1 Kikão Especial + Batata (180ml) + 1 Coca-Cola Lata', price: 20.00 },
  { category: 'Kikão', emoji: '🌭', name: 'Combo 17', description: '3 Kikão + 1 Refrigerante (1,5L)', price: 20.00 },
  { category: 'Kikão', emoji: '🌭', name: 'Combo 18', description: '6 Kikão + 1 Refrigerante (2L)', price: 30.00 },
  
  // Combos de Pastéis
  { category: 'Pastéis', emoji: '🥟', name: 'Combo 20', description: '1 Pastel Especial + 1 Batata (180ml) + 1 Coca-Cola Lata', price: 18.00 },
  { category: 'Pastéis', emoji: '🥟', name: 'Combo 21', description: '2 Pastéis Especiais + 1 Batata (300ml) + 1 Coca-Cola Lata', price: 26.00 },
  { category: 'Pastéis', emoji: '🥟', name: 'Combo 26', description: '5 Pastéis + 1 Refrigerante (2L)', price: 38.00 },
  
  // Combos Mistos
  { category: 'Mistos', emoji: '🎉', name: 'Combo 14', description: '1 Mixtão + Batata (180ml) + 1 Coca-Cola Lata', price: 20.00 },
  { category: 'Mistos', emoji: '🎉', name: 'Combo 19', description: '2 X-Salada + 2 Kikão + 1 Coca-Cola (1L)', price: 38.00 },
  { category: 'Mistos', emoji: '🎉', name: 'Combo 22', description: '2 X-Salada + 2 Kikão + 2 Pastéis + 1 Refrigerante (2L)', price: 46.00 },
];

async function seedCombos() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    console.log('Iniciando inserção de combos...');
    
    for (const combo of combos) {
      await connection.execute(
        'INSERT INTO menuItems (emoji, name, description, price) VALUES (?, ?, ?, ?)',
        [combo.emoji, combo.name, combo.description, combo.price]
      );
      console.log(`✓ ${combo.name} inserido`);
    }
    
    console.log(`\n✅ ${combos.length} combos inseridos com sucesso!`);
  } catch (error) {
    console.error('Erro ao inserir combos:', error);
  } finally {
    await connection.end();
  }
}

seedCombos();
