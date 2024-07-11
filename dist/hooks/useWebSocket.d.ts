export declare const useWebSocket: (payperviewId: number, token: string, userId: number, wsUrl: string) => {
    messages: any[];
    sendMessage: (message: string) => void;
    notifyTyping: (state: boolean) => void;
    showChatProgress: boolean;
};
