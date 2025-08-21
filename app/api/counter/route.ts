import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Counter, CounterActionsValues, CounterActionType } from '@/types';

// GET - Fetch current counter value
export async function GET() {
  try {
    // Get the last counter or create one if it doesn't exist
    let counter: Counter | null = await prisma.counter.findFirst({
      orderBy: {
        createdAt: 'desc'
      },
      take: 1,
    });    
    
    if (!counter) {
      counter = await prisma.counter.create({
        data: { value: 0 }
      })
    }
    
    return NextResponse.json(counter)
  } catch (error) {
    console.error('Error fetching counter:', error)
    return NextResponse.json(
      { error: 'Failed to fetch counter' },
      { status: 500 }
    )
  }
}

// POST - Update counter value
export async function POST(request: NextRequest) {
  try {
    const { action }: { action: CounterActionType } = await request.json()

    if (!action || (action !== CounterActionsValues.INCREMENT && action !== CounterActionsValues.DECREMENT)) {
      console.error('Invalid action. Must be "increment" or "decrement"')
      return NextResponse.json(
        { error: 'Invalid action. Must be "increment" or "decrement"' },
        { status: 400 }
      )
    }
    
    // Get the counter by id
    let counter: Counter | null = await prisma.counter.findFirst({
      orderBy: {
        createdAt: 'desc'
      },
      take: 1,
    });

    if (!counter) {
      console.error('Counter not found')
      return NextResponse.json(
        { error: 'Counter not found' },
        { status: 404 }
      )
    }
    
    // Update the counter based on action
    const newValue = action === CounterActionsValues.INCREMENT ? counter.value + 1 : counter.value - 1
    
    const updatedCounter: Counter = await prisma.counter.update({
      where: { id: counter.id },
      data: { value: newValue }
    })
    
    return NextResponse.json(updatedCounter)
  } catch (error) {
    console.error('Error updating counter:', error)
    return NextResponse.json(
      { error: 'Failed to update counter' },
      { status: 500 }
    )
  }
} 