import bcrypt from 'bcrypt';

export const hashText = async (text: string): Promise<string> => {
    const defaultSalt = await bcrypt.genSalt(10);
    return await bcrypt.hash(text, defaultSalt);
}

export const verifyHashed = async(text: string, hashedText: string): Promise<boolean> => {
    return await bcrypt.compare(text, hashedText);
};