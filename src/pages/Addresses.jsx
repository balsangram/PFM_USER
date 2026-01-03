import React from 'react'

export default function Addresses() {
    const cartTotal = Number(localStorage.getItem('cartTotal') || 0)
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold mb-4">Shipping Address</h1>
                <p className="text-sm text-gray-600 mb-6">This is a placeholder checkout step. Provide address selection here.</p>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <div className="border rounded-lg p-4">
                            <div className="text-gray-700">No saved addresses yet.</div>
                        </div>
                    </div>
                    <div>
                        <div className="border rounded-lg p-4">
                            <h2 className="font-semibold mb-2">Order Summary</h2>
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="rounded-lg bg-green-50 text-green-700 text-xs p-3 mb-3">Congratulations, Your delivery charge is waived off!!!</div>
                            <button className="w-full rounded-lg bg-red-600 text-white py-2 font-semibold hover:bg-red-700">Select Delivery Slot</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


