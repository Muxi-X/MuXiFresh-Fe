//审阅页面录取弹窗
import './index.less';
import {putData} from "../../interface/fetch";

export default function ConfirmAdmit(props: any) {

    const {hide} = props;
    const email = props.email;

    function setHide() {
        props.setHide()
    }

    function admit(email: string) {
        putData(`/schedule/admit`, {"email": email, "admission_status": props.status}, 'PUT')
            .then(() => {
                props.move()
            })
    }

    return (
        <div>
            {hide ?
                <div className="move_background">
                    <div className="move_admin">
                        <div className="move_title">确认录取</div>
                        <div className="move_box2">
                            <div>
                                <button className="move_button" onClick={() => {
                                    setHide();
                                    admit(email)
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
