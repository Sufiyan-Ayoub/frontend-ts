import { Button } from "@/app/comps/ui/button"
import { Input } from "@/app/comps/ui/input"
import { Label } from "@/app/comps/ui/label"
import { FC } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/comps/ui/card"
import Link from "next/link"


const Page: FC = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className={`min-w-80 sm:min-w-96 grid gap-6`}>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Reset your password</CardTitle>
                        <CardDescription>Enter your email to receive reset instructions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="em"
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                
                                <Button type="submit" className="w-full">
                                    Continue
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href={{ pathname: `signup` }} className="underline underline-offset-4">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
export default Page;