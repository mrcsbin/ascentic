import React, { useState, useMemo, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "@looop/quill-image-resize-module-react";
import axios from "axios";
import { ko } from "date-fns/esm/locale";
import { storage } from "../../../utils/firebaseConfig";
import "./QuillEditor.css";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const WritePost = ({ postEdit }) => {
  Quill.register("modules/ImageResize", ImageResize);
  const [postId, setPostId] = useState("");
  const [content, setContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [postStatus, setPostStatus] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [postCoreMessage, setPostCoreMessage] = useState("");
  const [eventDateRange, setEventDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const quillRef = useRef(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`/admin/post/${postEdit}`);
        const postData = response.data;

        // 포스트 정보 업데이트
        setPostId(postEdit);
        setPostTitle(postData.postTitle);
        setPostCategory(postData.postCategory);
        setPostStatus("");
        setContent(postData.postContent);
        setSelectedImage(postData.postImage);
        setPostCoreMessage(postData.postCoreMessage);
        setEventDateRange([
          {
            startDate: new Date(postData.eventStartDate),
            endDate: new Date(postData.eventEndDate),
            key: "selection",
          },
        ]);
      } catch (error) {
        console.error("Error fetching post details: ", error);
      }
    };

    if (postEdit) {
      fetchPostDetails();
    }
  }, [postEdit]);
  const handleSave = async () => {
    const data = {
      postId,
      postCategory,
      postTitle,
      postContent: content,
      postStatus: postStatus,
      postImage: selectedImage,
      postCoreMessage: postCoreMessage,
      eventStartDate: eventDateRange[0].startDate,
      eventEndDate: eventDateRange[0].endDate,
    };
    console.log(data);
    if (postStatus === "") return;
    let message = "";
    switch (postStatus) {
      case 0:
        message = "저장하시겠습니까?";
        break;
      case 1:
        message = "임시저장하시겠습니까?";
        break;
      case 2:
        message = "삭제하시겠습니까?";
        break;
      default:
        break;
    }

    if (window.confirm(message)) {
      try {
        const response = await axios.post("/admin/post", data);
        if (response.status === 200) {
          let successMessage = "";
          switch (postStatus) {
            case 0:
              successMessage = "저장에 성공했습니다!";
              break;
            case 1:
              successMessage = "임시 저장에 성공했습니다!";
              break;
            case 2:
              successMessage = "삭제에 성공했습니다!";
              break;
            default:
              break;
          }
          alert(successMessage);
          // 성공 메시지 처리
          window.location.href = "http://localhost:3000/admin/eventnews";
        }
      } catch (error) {
        console.error("Error saving post: ", error);
      }
    }
  };

  useEffect(() => {
    handleSave();
  }, [postStatus]);

  const mainImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("/admin/mainimg", formData, config)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        const imageUrl = response.data;
        setSelectedImage(imageUrl);
      })
      .catch((error) => {
        console.error("이미지 업로드 오류: ", error);
      });
  };

  const mainImageReplace = (e) => {
    e.preventDefault();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = (e) => {
      mainImageUpload(e);
    };
  };

  const mainDeleteImage = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedImage);

    axios
      .post("/admin/mainimg", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setSelectedImage(null);
      })
      .catch((error) => {
        console.error("이미지 삭제 오류: ", error);
      });
  };
  const renderStaticRangeLabel = (key, label) => {
    switch (key) {
      case "Today":
        return "오늘";
      case "yesterday":
        return "어제";
      case "this_week":
        return "이번 주";
      case "last_week":
        return "저번 주";
      case "this_month":
        return "이번 달";
      case "last_month":
        return "저번 달";
      case "days_up_to_today":
        return "오늘로부터 몇일 전";
      case "days_starting_today":
        return "오늘로부터 몇일 후";
      default:
        return label;
    }
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    try {
      // Firebase Storage에 이미지 업로드
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`images/${file.name}`);
      await imageRef.put(file);

      // 이미지 다운로드 URL 가져오기
      const imageUrl = await imageRef.getDownloadURL();
      console.log(imageUrl);

      // Quill Editor에 이미지 URL 삽입
      const range = quillRef.current.getEditor().getSelection();
      quillRef.current.getEditor().insertEmbed(range.index, "image", imageUrl);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const handleDateRangeChange = (item) => {
    setEventDateRange([item.selection]);
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["image"],
        ],
        handlers: {
          image: () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();
            input.onchange = handleImageUpload;
          },
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    }),
    []
  );

  return (
    <div className="QuillContainer">
      <div className="NameCategory">
        <h1>[이벤트 및 뉴스 작성]</h1>
        <div className="post-status">
          <button onClick={() => setPostStatus(0)}>저장하기</button>
          <button onClick={() => setPostStatus(1)}>임시저장하기</button>
          <button onClick={() => setPostStatus(2)}>삭제하기</button>
        </div>
        {postCategory === "event" && (
          <div className="image-selection">
            <h4>대표 이미지 선택</h4>
            {selectedImage && (
              <div className="image-container">
                {/* <img
                  src={`http://localhost:8080/admin/download?img=${selectedImage}`}
                  alt="대표 이미지"
                  className="selected-image"
                /> */}
                ${selectedImage}
                <div className="image-buttons">
                  <button onClick={mainImageReplace}>이미지 교체</button>
                  <button onClick={mainDeleteImage}>이미지 삭제</button>
                </div>
              </div>
            )}
            {!selectedImage && (
              <div className="upload-container">
                <input
                  type="file"
                  accept="image/*"
                  onChange={mainImageUpload}
                />
              </div>
            )}
          </div>
        )}
        <div className="post-category-input">
          <select
            value={postCategory}
            onChange={(e) => {
              setPostCategory(e.target.value);
              setEventDateRange([
                {
                  startDate: new Date(),
                  endDate: new Date(),
                  key: "selection",
                },
              ]);
            }}
          >
            <option value="">게시판을 선택해 주세요.</option>
            <option value="event">이벤트</option>
            <option value="news">뉴스</option>
          </select>
          <input
            type="text"
            placeholder="제목"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="한줄 메시지"
            value={postCoreMessage}
            onChange={(e) => setPostCoreMessage(e.target.value)}
          />
        </div>
      </div>

      <div className="event-date">
        <h4>[이벤트 날짜 선택]</h4>
        <div className="CalendarContainer">
          <DateRangePicker
            onChange={handleDateRangeChange}
            moveRangeOnFirstSelection={false}
            showSelectionPreview={true}
            months={2}
            ranges={eventDateRange}
            direction="horizontal"
            locale={ko}
          />
        </div>
      </div>

      <ReactQuill
        ref={quillRef}
        value={content}
        formats={formats}
        onChange={setContent}
        modules={modules}
      />
    </div>
  );
};

export default WritePost;
