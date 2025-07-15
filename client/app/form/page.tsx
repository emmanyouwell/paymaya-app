'use client';
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Delete } from 'lucide-react';
const page = () => {
    return (
        <div className="flex flex-col items-center h-[calc(100vh-2rem)] p-8 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
                <Card className="w-[35vw] h-auto">
                    <CardHeader className="flex flex-col items-center">
                        <CardTitle>
                            <Image
                                src="/assets/paymaya-logo2.png"
                                alt="PayMaya Logo"
                                width={150}
                                height={50}
                            />
                        </CardTitle>
                        <CardDescription>
                            Enter amount to pay and select payment method
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-4">
                            <form className="w-full">
                                <div className="flex flex-col gap-6 w-max mx-auto">
                                    <div className="grid w-full gap-2">
                                        <Label htmlFor="number">Amount</Label>
                                        <Input
                                            id="number"
                                            type="number"
                                            placeholder="0.00"
                                            className="h-12 text-2xl"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 place-items-center gap-2 w-max mx-auto">
                                        <Button variant="outline" className="w-20 h-20 text-lg">1</Button>
                                        <Button variant="outline" className="w-20 h-20 text-lg">2</Button>
                                        <Button variant="outline" className="w-20 h-20 text-lg">3</Button>
                                        <Button variant="outline" className="w-20 h-20 text-lg">4</Button>
                                        <Button variant="outline" className="w-20 h-20 text-lg">5</Button>
                                        <Button variant="outline" className="w-20 h-20 text-lg">6</Button>
                                        <Button variant="outline" className="w-20 h-20 text-lg">7</Button>
                                        <Button variant="outline" className="w-20 h-20 text-lg">8</Button>
                                        <Button variant="outline" className="w-20 h-20 text-lg">9</Button>
                                        <Button variant="outline" className="w-20 h-20 text-lg">.</Button>
                                        <Button variant="outline" className="w-20 h-20 text-lg">0</Button>
                                        <Button variant="outline" className="w-20 h-20 text-lg"><Delete /></Button>
                                    </div>
                                </div>
                            </form>
                            <div className="w-full">
                                <Label>Payment Method</Label>
                                <div className="flex flex-col gap-2 mt-2">
                                    <Button variant="outline" className="w-full">
                                        Card
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        <Image src="/assets/GCash-Logo.png" alt="GCash Logo" width={50} height={50} className="inline-block mr-2" />
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        MAYA
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        QRPH
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Button type="submit" className="flex-1 bg-green-800">
                            Pay
                        </Button>
                        <Button variant="destructive" className="flex-1">
                            Cancel
                        </Button>
                    </CardFooter>
                </Card>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

            </footer>
        </div>
    )
}

export default page