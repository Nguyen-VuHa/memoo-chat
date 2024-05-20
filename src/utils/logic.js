export function groupMessagesByMinute(messages) {
    let groupedMessages = {};
    messages.forEach(message => {
        // Chuyển đổi timestamp thành đối tượng Date
        const date = new Date(message.time);

        // Tạo một key dựa trên ngày, giờ và phút
        const key = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
        // Nếu key chưa tồn tại trong groupedMessages, tạo một mảng mới
        if (!groupedMessages[key]) {
            groupedMessages[key] = [];
        }

        // Thêm tin nhắn vào nhóm tương ứng
        groupedMessages[key].push(message);
    });

    return groupedMessages;
}