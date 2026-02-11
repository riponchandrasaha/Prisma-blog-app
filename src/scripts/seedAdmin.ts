import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
    try {
        const adminData = {
            name: "Admin",
            email: "admin@admin.com",
            user: UserRole.ADMIN,
            password: "admin123"
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        });
        if (!existingUser) {
            throw new Error("Admin user already exists in DB");
        }
        const signUpAdmin = await fetch(" http://localhost:3000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adminData)
        })
    } catch (error) {
        console.log(error);
    }

}
