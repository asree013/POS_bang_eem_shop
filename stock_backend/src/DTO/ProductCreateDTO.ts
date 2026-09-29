import { ApiProperty } from '@nestjs/swagger';

// DTO สำหรับรายการสินค้าในคำสั่งซื้อ
export class OrderItem {
    @ApiProperty({ description: 'รหัสผลิตภัณฑ์' })
    product_id: string; // รหัสผลิตภัณฑ์

    @ApiProperty({ description: 'จำนวนที่สั่งซื้อ' })
    count: number; // จำนวนที่สั่งซื้อ

    @ApiProperty({ description: 'ราคาสินค้า' })
    price: string;

    constructor(product_id: string, count: number, price: string) {
        this.product_id = product_id;
        this.count = count;
        this.price = price;
    }
}

// DTO สำหรับคำสั่งซื้อ
export class OrderDTO {
    @ApiProperty({ description: 'รายละเอียดคำสั่งซื้อ' })
    detail: string; // รายละเอียดคำสั่งซื้อ

    @ApiProperty({ description: 'สถานะคำสั่งซื้อ' })
    status: string; // สถานะคำสั่งซื้อ (เช่น pending, completed)

    @ApiProperty({ description: 'ราคารวมทั้งหมด' })
    total_price: string; // ราคารวมทั้งหมด

    @ApiProperty({ description: 'รหัสการชำระเงิน' })
    payment_id: string; // รหัสการชำระเงิน

    @ApiProperty({ type: [OrderItem], required: false, description: 'รายการสินค้าที่สั่งซื้อ' })
    order_item?: OrderItem[]; // รายการสินค้าที่สั่งซื้อ (สามารถเป็น optional)

    @ApiProperty({ description: 'ราคาสินค้า' })
    create_date: string;

    @ApiProperty({ description: 'ราคาสินค้า' })
    update_date: string;

    constructor(detail: string, status: string, total_price: string, payment_id: string, order_item?: OrderItem[]) {
        this.detail = detail;
        this.status = status;
        this.total_price = total_price;
        this.payment_id = payment_id;
        this.order_item = order_item;
    }
}
