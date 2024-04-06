import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: { json: () => any }) {
  try {
    const data = await req.json();
    const { name, city, phone } = data;
    
    const newClient = await prisma.customer.create({
      data: {
        name,
        city,
        phone
      },
    });
    return NextResponse.json(newClient);
  } catch (error) {
    console.log(error , "error")
    return NextResponse.error();
  }
}
 
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (query) {
      const id = parseInt(query);
      if (!isNaN(id)) {
        const client = await prisma.customer.findUnique({
          where: {
            id: id,
          },
        });

        if (!client) {
          return NextResponse.error();
        }

        return NextResponse.json(client);
      } else {
        const clients = await prisma.customer.findMany({
          where: {
            name: {
              contains: query,
            },
          },
        });

        return NextResponse.json(clients);
      }
    } else {
      const clients = await prisma.customer.findMany();
      return NextResponse.json(clients);
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error();
  }
}
