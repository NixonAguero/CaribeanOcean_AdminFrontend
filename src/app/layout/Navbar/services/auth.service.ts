import apiClient from "../../../../shared/services/apliClient";
import { clearSession } from "../../../../features/authentication/services/session.service";

export async function logout(): Promise<void> {
    try {
        await apiClient.post("/Auth/logout");
    } catch (error) {
        console.error("Logout failed:", error);
    } finally {
        clearSession();
        window.location.href = "/admin/login";
    }
}
