'use client';
import React, { useState } from 'react'
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
import { Delete, CreditCard } from 'lucide-react';

const page = () => {
    const [amount, setAmount] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');

    const handleNumberClick = (value: string) => {
        if (value === '.') {
            if (amount.includes('.')) return;
            setAmount(amount === '' ? '0.' : amount + value);
        } else {
            setAmount(amount + value);
        }
    };

    const handleDelete = () => {
        setAmount(amount.slice(0, -1));
    };

    const handleClear = () => {
        setAmount('');
    };

    const handlePaymentSelect = (method: string) => {
    if (selectedPayment === method) {
        setSelectedPayment('');
    } else {
        setSelectedPayment(method);
    }
};
    return (
        <div className="flex flex-col items-center h-[calc(100vh-2rem)] p-6 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
                <Card className="w-[45vw] h-auto">
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
                        <div className="flex items-start gap-4">
                            <form className="w-full">
                                <div className="flex flex-col gap-4 w-max mx-auto">
                                    <div className="grid w-full gap-2">
                                        <Label htmlFor="number">Amount</Label>
                                        <Input
                                            id="number"
                                            type="text"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="h-12 text-2xl"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 place-items-center gap-2 w-max mx-auto">
                                        <Button type="button" variant="outline" className="w-20 h-18 text-lg" onClick={() => handleNumberClick('1')}>1</Button>
                                        <Button type="button" variant="outline" className="w-20 h-18 text-lg" onClick={() => handleNumberClick('2')}>2</Button>
                                        <Button type="button" variant="outline" className="w-20 h-18 text-lg" onClick={() => handleNumberClick('3')}>3</Button>
                                        <Button type="button" variant="outline" className="w-20 h-18 text-lg" onClick={() => handleNumberClick('4')}>4</Button>
                                        <Button type="button" variant="outline" className="w-20 h-18 text-lg" onClick={() => handleNumberClick('5')}>5</Button>
                                        <Button type="button" variant="outline" className="w-20 h-18 text-lg" onClick={() => handleNumberClick('6')}>6</Button>
                                        <Button type="button" variant="outline" className="w-20 h-18 text-lg" onClick={() => handleNumberClick('7')}>7</Button>
                                        <Button type="button" variant="outline" className="w-20 h-18 text-lg" onClick={() => handleNumberClick('8')}>8</Button>
                                        <Button type="button" variant="outline" className="w-20 h-18 text-lg" onClick={() => handleNumberClick('9')}>9</Button>
                                        <Button type="button" variant="outline" className="w-20 h-18 text-lg" onClick={() => handleNumberClick('.')}>.</Button>
                                        <Button type="button" variant="outline" className="w-20 h-18 text-lg" onClick={() => handleNumberClick('0')}>0</Button>
                                        <Button type="button" variant="outline" className="w-20 h-18 text-lg" onClick={handleDelete}><Delete /></Button>
                                    </div>
                                </div>
                            </form>
                            <div className="w-full">
                                <Label>Payment Method</Label>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <Button 
                                        variant={selectedPayment === 'card' ? 'default' : 'outline'} 
                                        className={`w-full h-12 transition-colors ${
                                            selectedPayment === 'card' 
                                                ? 'bg-green-200 border border-green-600 text-gray-800 hover:bg-green-300' 
                                                : 'hover:bg-gray-100'
                                        }`}
                                        onClick={() => handlePaymentSelect('card')}
                                    >
                                        <CreditCard size={40} color="#db0000" strokeWidth={1.5} />Card
                                    </Button>
                                    <Button 
                                        variant={selectedPayment === 'gcash' ? 'default' : 'outline'} 
                                        className={`w-full h-12 transition-colors ${
                                            selectedPayment === 'gcash' 
                                                ? 'bg-green-200 border border-green-600 hover:bg-green-300' 
                                                : 'hover:bg-gray-100'
                                        }`}
                                        onClick={() => handlePaymentSelect('gcash')}
                                    >
                                        <Image src="/assets/GCash-Logo.png" alt="GCash Logo" width={80} height={80} className="inline-block mr-2" />
                                    </Button>
                                    <Button 
                                        variant={selectedPayment === 'maya' ? 'default' : 'outline'} 
                                        className={`w-full h-12 transition-colors ${
                                            selectedPayment === 'maya' 
                                                ? 'bg-green-200 border border-green-600 hover:bg-green-300' 
                                                : 'hover:bg-gray-100'
                                        }`}
                                        onClick={() => handlePaymentSelect('maya')}
                                    >
                                        <Image src="/assets/maya-logo.png" alt="Maya Logo" width={60} height={60} className="inline-block mr-2" />
                                    </Button>
                                    <Button 
                                        variant={selectedPayment === 'qrph' ? 'default' : 'outline'} 
                                        className={`w-full h-12 transition-colors ${
                                            selectedPayment === 'qrph' 
                                                ? 'bg-green-200 border border-green-600 hover:bg-green-300' 
                                                : 'hover:bg-gray-100'
                                        }`}
                                        onClick={() => handlePaymentSelect('qrph')}
                                    >
                                        <Image src="/assets/QRPh-logo.png" alt="QRPh Logo" width={70} height={70} className="inline-block mr-2" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Button type="submit" className="flex-1 bg-green-800">
                            Pay
                        </Button>
                        <Button variant="destructive" className="flex-1" onClick={handleClear}>
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