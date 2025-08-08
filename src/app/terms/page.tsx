export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Điều khoản và Điều kiện</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">1. Chấp nhận Điều khoản</h2>
        <p className="mb-2">
          Bằng việc truy cập hoặc sử dụng trang web luyện thi JLPT của chúng
          tôi, bạn đồng ý tuân thủ và bị ràng buộc bởi các Điều khoản và Điều
          kiện này.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">2. Sử dụng Nội dung</h2>
        <p className="mb-2">
          Tất cả các đề thi mẫu JLPT, danh sách từ vựng, tài liệu kanji và các
          nội dung khác được cung cấp trên trang web này chỉ dành cho mục đích
          học tập cá nhân, phi thương mại.
        </p>
        <p className="mb-2">
          Nghiêm cấm sao chép, phân phối hoặc sử dụng vì mục đích thương mại các
          tài liệu của chúng tôi khi không được phép.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">3. Sở hữu Trí tuệ</h2>
        <p className="mb-2">
          JLPT &quot;Kỳ thi Năng lực tiếng Nhật&quot; là tài sản trí tuệ của Quỹ
          Nhật Bản và Dịch vụ Trao đổi Giáo dục Nhật Bản JEES.
        </p>
        <p className="mb-2">
          Tài liệu mẫu của chúng tôi được thiết kế để giúp chuẩn bị cho kỳ thi
          nhưng không phải là tài liệu chính thức của JLPT.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          4. Độ chính xác của Tài liệu
        </h2>
        <p className="mb-2">
          Mặc dù chúng tôi cố gắng cung cấp các tài nguyên học tập chính xác và
          hữu ích, chúng tôi không đảm bảo về tính đầy đủ hoặc chính xác của các
          bài kiểm tra mẫu và tài liệu học tập của chúng tôi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">5. Tài khoản Người dùng</h2>
        <p className="mb-2">
          Nếu bạn tạo tài khoản trên trang web của chúng tôi, bạn có trách nhiệm
          duy trì tính bảo mật thông tin tài khoản của mình và chịu trách nhiệm
          cho mọi hoạt động dưới tài khoản của bạn.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">6. Giới hạn Trách nhiệm</h2>
        <p className="mb-2">
          Chúng tôi sẽ không chịu trách nhiệm cho bất kỳ thiệt hại trực tiếp,
          gián tiếp, ngẫu nhiên, hậu quả hoặc mang tính trừng phạt phát sinh từ
          việc truy cập hoặc sử dụng trang web của chúng tôi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">7. Thay đổi Điều khoản</h2>
        <p className="mb-2">
          Chúng tôi có quyền sửa đổi các điều khoản này bất cứ lúc nào. Việc
          tiếp tục sử dụng trang web sau những thay đổi đó đồng nghĩa với việc
          bạn chấp nhận các điều khoản đã được sửa đổi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">8. Luật điều chỉnh</h2>
        <p className="mb-2">
          Các Điều khoản này sẽ được điều chỉnh và giải thích theo luật pháp
          hiện hành, không liên quan đến các nguyên tắc xung đột pháp luật.
        </p>
      </section>

      <div className="mt-8 text-sm text-gray-600">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
