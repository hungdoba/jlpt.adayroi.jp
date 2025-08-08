export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Đôi nét về Jlpt adayroi!</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Lời cảm ơn!</h2>
        <p className="mb-2">
          Chào bạn, <br></br>
          Cảm ơn bạn đã ghé thăm và ủng hộ trang web của chúng tôi. Chúc bạn có
          một quá trình học tập tiếng Nhật hiểu quả.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Người Sáng Lập</h2>
        <p className="mb-2">
          Xin chào! Tôi là một kỹ sư đang làm việc tại Nhật Bản và đang trên
          hành trình học tập và rèn luyện tiếng Nhật. Trang web này được tạo ra
          từ trải nghiệm cá nhân của tôi trong quá trình học tập ngôn ngữ này.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Sứ Mệnh Của Chúng Tôi</h2>
        <p className="mb-2">
          JLPT AdayRoi được tạo ra với mục tiêu giúp mọi người có thể cùng học
          tập, trao đổi kiến thức và tạo ra một môi trường học tiếng Nhật thú
          vị, hiệu quả hơn.
        </p>
        <p className="mb-2">
          Chúng tôi tin rằng việc học một ngôn ngữ mới không chỉ là ghi nhớ từ
          vựng và ngữ pháp, mà còn là quá trình khám phá và chia sẻ.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Tính Năng Chính</h2>
        <p className="mb-2">
          <strong>Đề Thi Miễn Phí:</strong> Chúng tôi cung cấp các đề thi miễn
          phí cho các cấp độ N1, N2, N3 của kỳ thi JLPT các năm trước, giúp bạn
          có thể ôn luyện một cách hiệu quả.
        </p>
        <p className="mb-2">
          <strong>Lưu Trữ Không Cần Đăng Nhập:</strong> Trang web được thiết kế
          để tự động lưu lịch sử các đáp án bạn đã chọn và các ghi chú (memo) mà
          không cần đăng nhập, giúp việc học tập trở nên thuận tiện hơn.
        </p>
        <p className="mb-2">
          <strong>Giải Thích Chi Tiết:</strong> Chúng tôi cung cấp các phần giải
          thích chi tiết cho mỗi câu hỏi, giúp bạn dễ dàng hiểu và ghi nhớ kiến
          thức.
        </p>
        <p className="mb-2">
          <strong>Cộng Đồng Tương Tác:</strong> Bạn có thể đóng góp ý kiến bằng
          cách nhấp vào phần &quot;Đóng góp&quot; ở mỗi câu hỏi và bình luận
          trực tiếp qua Facebook. Admin sẽ cập nhật các đóng góp sớm nhất có
          thể.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Cùng Nhau Học Tập</h2>
        <p className="mb-2">
          Chúng tôi tin rằng học tập là một hành trình chung. Qua việc chia sẻ
          kinh nghiệm, mẹo học và thậm chí cả những khó khăn, chúng ta có thể
          tạo ra một cộng đồng học tập mạnh mẽ và hỗ trợ nhau.
        </p>
        <p className="mb-2">
          Hãy tham gia cùng chúng tôi trong hành trình chinh phục tiếng Nhật và
          kỳ thi JLPT!
        </p>
      </section>

      <div className="mt-8 text-sm text-gray-600">
        <p>Cập nhật: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
