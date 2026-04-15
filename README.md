# Backend Programming Template (2025)

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Gacha Endpoint

Route: http://localhost:5000/api/gacha
Method: POST
Description: Melakukan gacha untuk user

POST ke body raw(input):
{
"userId": "user1",
"username": "Jane Doe"
}

Response:
{
"success": true,
"message": "Gacha berhasil",
"data": {
"isWinner": true,
"prizeName": "Pulsa Rp50.000",
"remainingToday": 4
}
}

Jika kesempatan sudah habis
{
"success": false,
"message": "Kamu sudah mencapai batas 5 kali gacha hari ini. Coba lagi besok!!!"
}

2. Gacha History Endpoint
   Route: http://localhost:5000/api/gacha/history/userId
   contoh: http://localhost:5000/api/gacha/history/user1
   Method: GET
   Description: Menampilkan riwayat gacha berdasarkan userId

Response:
{
"success": true,
"message": "Riwayat gacha berhasil diambil",
"data": [
{
"rolledAt": "2026-04-15T07:03:25.403Z",
"isWinner": true,
"prize": "Pulsa Rp50.000"
},
{
"rolledAt": "2026-04-15T07:03:21.771Z",
"isWinner": false,
"prize": null
},
{
"rolledAt": "2026-04-15T07:03:16.383Z",
"isWinner": false,
"prize": null
},
{
"rolledAt": "2026-04-15T05:12:13.346Z",
"isWinner": false,
"prize": null
},
{
"rolledAt": "2026-04-15T04:59:05.223Z",
"isWinner": true,
"prize": "Pulsa Rp50.000"
}
]
}

3. Prize List Endpoint
   Route: http://localhost:5000/api/prizes
   Method: GET
   Description: Menampilkan daftar hadiah dan sisa kuota

Response:
{
"success": true,
"message": "Daftar hadiah berhasil diambil",
"data": [
{
"prizeName": "Emas 10 gram",
"totalQuota": 1,
"claimed": 0,
"remaining": 1
},
{
"prizeName": "Smartphone X",
"totalQuota": 5,
"claimed": 0,
"remaining": 5
},
{
"prizeName": "Smartwatch Y",
"totalQuota": 10,
"claimed": 0,
"remaining": 10
},
{
"prizeName": "Voucher Rp100.000",
"totalQuota": 100,
"claimed": 0,
"remaining": 100
},
{
"prizeName": "Pulsa Rp50.000",
"totalQuota": 500,
"claimed": 2,
"remaining": 498
}
]
}

4. Winners Endpoint
   Route: /api/gacha/winners
   Method: GET
   Description: Menampilkan daftar pemenang dengan nama disamarkan

Response:
{
"success": true,
"message": "Daftar pemenang berhasil diambil",
"data": {
"Pulsa Rp50.000": [
"(1) J*ne D*e",
"(2) J*ne D*e"
]
}
}
