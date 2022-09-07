//审阅页面确认删除弹窗
import './index.less';
import {postData} from "../../interface/fetch";

export default function ConfirmDelete(props: any) {

    const {hide} = props;
    const email = props.email;

    function setHide() {
        props.setHide()
    }

    function deleteinfo(email: string) {
      postData(`/form/delete`, {'email': email}, "POST")
          .then(() => {
              props.move()
          })
  }

    return (
        <div>
            {hide ?
                <div className="move_background">
                    <div className="move_admin">
                        <div className="move_title">确认删除</div>
                        <div className="move_box2">
                            <div>
                                <button className="move_button" onClick={() => {
                                    setHide();
                                    deleteinfo(email)
                                }}>确认
                                </button>
                                <button className="move_button" onClick={() => {
                                    setHide();
                                }}>返回
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                : ''}
        </div>
    )
}
