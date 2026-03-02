import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ChatHistoryResponse, PopulatedChatMetadata } from "@/types";

export const useChatHistory = () => {
    const { data, isLoading, refetch, isError } = useQuery({
        queryKey: ["chat-history"],
        queryFn: async () => {
            const response = await api.get<ChatHistoryResponse>("/chats/history");
            return response.data;
        },
    });

    return {
        chats: data?.chats || [] as PopulatedChatMetadata[],
        isLoading,
        isError,
        refetch,
    };
};
