Hướng dẫn chạy tool Blum
1, Có cái folder bypass, cái này dùng để import vào trong chrome để có thể chơi game blum ở trên web, chỉ cần import vào là có thể chơi được
2, Ở trong file blum.json, nó là nơi chứa các token của các acc chạy, bạn sẽ lấy token ở trong header ở trong api để đưa vào access, và thay cả username , mỗi một object là một tài khoản. Khi chạy hết các task, và claim hết, chơi game,... của từng acc thì nó sẽ chạy sang acc khác
3, Các lỗi khi nó báo ở trong phần claim hay start task thì đó chỉ là log thôi, lười chưa muốn sửa, ko sợ =))) 
4, Thay token và user ở trong blum.json rồi yarn start là chạy
