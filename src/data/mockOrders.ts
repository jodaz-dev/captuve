export interface OrderPhoto {
  id: string;
  thumbnail: string;
  url: string;
}

export interface Order {
  id: string;
  orderNumber: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  photos: OrderPhoto[];
  totalAmount: number;
  submittedAt: string;
  paymentReference: string;
  paymentProof: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const mockOrders: Order[] = [
  {
    id: "order-001",
    orderNumber: 1,
    buyerName: "María García López",
    buyerEmail: "maria.garcia@email.com",
    buyerPhone: "0412-555-1234",
    photos: [
      { id: "ir-1", thumbnail: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=150", url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200" },
      { id: "ir-2", thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=150", url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200" },
      { id: "ir-4", thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200" },
    ],
    totalAmount: 45.00,
    submittedAt: "2025-12-09T14:32:00",
    paymentReference: "TRF-2025120914320001",
    paymentProof: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    status: 'pending',
  },
  {
    id: "order-002",
    orderNumber: 2,
    buyerName: "Carlos Rodríguez Mendoza",
    buyerEmail: "carlos.rm@gmail.com",
    buyerPhone: "0414-123-9876",
    photos: [
      { id: "ir-6", thumbnail: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=150", url: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=1200" },
      { id: "ir-8", thumbnail: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=150", url: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200" },
    ],
    totalAmount: 30.00,
    submittedAt: "2025-12-09T10:15:00",
    paymentReference: "PAG-87654321",
    paymentProof: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    status: 'pending',
  },
  {
    id: "order-003",
    orderNumber: 3,
    buyerName: "Ana Martínez",
    buyerEmail: "ana.martinez@hotmail.com",
    buyerPhone: "0424-567-8901",
    photos: [
      { id: "mr-1", thumbnail: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=150", url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200" },
      { id: "mr-3", thumbnail: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=150", url: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1200" },
      { id: "mr-5", thumbnail: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=150", url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200" },
      { id: "mr-6", thumbnail: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=150", url: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=1200" },
    ],
    totalAmount: 60.00,
    submittedAt: "2025-12-08T18:45:00",
    paymentReference: "REF-20251208-001",
    paymentProof: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    status: 'pending',
  },
  {
    id: "order-004",
    orderNumber: 4,
    buyerName: "José Luis Pérez",
    buyerEmail: "jlperez@empresa.com",
    buyerPhone: "0416-234-5678",
    photos: [
      { id: "mb-1", thumbnail: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=150", url: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=1200" },
    ],
    totalAmount: 15.00,
    submittedAt: "2025-12-08T09:20:00",
    paymentReference: "PAGO-456789",
    paymentProof: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
    status: 'pending',
  },
  {
    id: "order-005",
    orderNumber: 5,
    buyerName: "Sofía Hernández Ruiz",
    buyerEmail: "sofia.hr@outlook.com",
    buyerPhone: "0426-876-5432",
    photos: [
      { id: "ts-1", thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=150", url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200" },
      { id: "ts-2", thumbnail: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=150", url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200" },
      { id: "ir-3", thumbnail: "https://images.unsplash.com/photo-1559311648-d8a1c4db88ec?w=150", url: "https://images.unsplash.com/photo-1559311648-d8a1c4db88ec?w=1200" },
      { id: "ir-5", thumbnail: "https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=150", url: "https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=1200" },
      { id: "ir-7", thumbnail: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=150", url: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200" },
    ],
    totalAmount: 75.00,
    submittedAt: "2025-12-07T16:00:00",
    paymentReference: "TRANSF-123ABC",
    paymentProof: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
    status: 'pending',
  },
];
