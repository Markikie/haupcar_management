|---|---|---|
| GET | `/health` | ตรวจสอบสถานะ API |
| GET | `/api/v1/cars` | ดูรถทั้งหมด |
| GET | `/api/v1/cars/:id` | ดูรถจาก ID |
| POST | `/api/v1/cars` | เพิ่มรถ |
| PUT | `/api/v1/cars/:id` | แก้ไขรถ |
| DELETE | `/api/v1/cars/:id` | ลบรถ |

## Run with Docker

```bash
docker compose up -d --build
```

เปิดระบบ:

```text
Frontend: http://localhost:5173
Backend: http://localhost:3000
Health: http://localhost:3000/health
```

ดูสถานะและ Logs:

```bash
docker compose ps
docker compose logs -f backend
```

หยุดระบบ:

```bash
docker compose down
```

> หลีกเลี่ยง `docker compose down -v` หากไม่ต้องการลบข้อมูล PostgreSQL

## Run Locally

### Database

```bash
docker compose up -d postgres
```

### Backend

```bash
cd backend
npm install
```

สร้าง `backend/.env`:

```env
PORT=3000
DATABASE_URL="postgresql://haupcar:car_password@localhost:5432/haupcar?schema=public"
```

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

สร้าง `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

```bash
npm run dev
```

## Validation Rules

- `registrationNumber`, `brand` และ `model` ห้ามว่าง
- `registrationNumber` ต้องไม่ซ้ำ
- `notes` ยาวไม่เกิน 500 ตัวอักษร

## Useful Commands

### Backend

```bash
npm run typecheck
npm run build
npx prisma studio
```

### Frontend

```bash
npm run build
```

## Additional Improvements

- แยก Controller, Service และ Repository
- ใช้ TypeScript และ Prisma Migration
- ใช้ Zod Validation และ Error Middleware
- มี Graceful Shutdown
- มี Docker Compose และ Responsive UI
- มี Modal สำหรับ Add และ Edit

## Future Improvements

- Authentication และ Authorization
- Pagination, Search และ Filter
- Automated Tests
- Upload รูปภาพรถยนต์

## Git

```bash
git status
git add .
git commit -m "add project documentation"
```