import { email } from "better-auth/*";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
    try {
        const adminData = {
            name: "Admin4",
            email: "admin47@admin.com",
            user: UserRole.ADMIN,
            password: "admin123",
            emailVerified: true
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        });
        if (!existingUser) {
            throw new Error("user already exists in DB");
        }
        const signUpAdmin = await fetch("http://localhost:3000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adminData)
        })

        if (!signUpAdmin.ok) {
            await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified: true
                }
            });
        }
        console.log("success..");
    }


    catch (error) {
        console.log(error);
    }
}
seedAdmin()
