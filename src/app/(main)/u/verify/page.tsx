"use client"
import { FC, useState } from "react"
import { Button } from "@/app/comps/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/comps/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/comps/ui/input-otp"

const Page: FC = () => {
    const [value, setValue] = useState("")
    
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className={`min-w-80 sm:min-w-96 grid gap-6 select-none`}>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Verify your OTP</CardTitle>
                        <CardDescription>Enter the code sent to your email to continue.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <div className="grid place-items-center gap-6">
                                <InputOTP
                                    maxLength={6}
                                    value={value}
                                    onChange={(value) => setValue(value)}
                                >
                                    <InputOTPGroup>
                                        {Array.from({ length: 6}).map((_, i) => <InputOTPSlot key={`vrf-otp-${i}`} index={i} />)}
                                    </InputOTPGroup>
                                </InputOTP>
                            
                                <Button className="px-10">
                                    Continue
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t receive the code?{" "}
                                <button className="underline underline-offset-4 hover:text-primary">Resend OTP</button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
export default Page;