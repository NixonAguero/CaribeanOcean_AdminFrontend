import apiClient from "../../../../shared/services/apliClient";

export async function logout(): Promise<void> {
    console.log('Log out');
    try {
        await apiClient.post("/Auth/logout");
    } catch (error) {
        console.error("Logout failed:", error);
    } finally {
        // Clear any stored auth data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.clear();

        // Redirect to login
        window.location.href = "/login";
    }
}
