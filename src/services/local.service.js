    export const getLocalStorage = () => {
        try {
            const raw = localStorage.getItem("customer");
            if (!raw) return null;

            const user = JSON.parse(raw);

            return {
                id: user?.user?.id || null,
                phone: user?.user?.phone || null,
                token: user?.accessToken || null,
            };
        } catch (err) {
            console.error("Failed to read user from storage", err);
            return null;
        }
    };
