import bcrypt from "bcrypt";

export const comparePasswords = async (
    password: string | undefined | null,
    storedPassword: string
): Promise<boolean> => {
    if (!password) {
        return false; // Missing password returns false
    }
    try {
        return await bcrypt.compare(password, storedPassword);
    } catch (error) {
        return false;
    }
};