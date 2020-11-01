import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import { Button } from "antd-mobile";
// import Form from "antd/lib/form/Form";
import { Form, Modal, Select, Button } from "antd";

import "../node_modules/antd/dist/antd.css";
import "antd-mobile/dist/antd-mobile.css";

const AppContext = React.createContext();
const { Option } = Select;

function DogList() {
  const dogLsit = [
    {
      dogId: "asd1",
      dogName: "小白",
    },
    {
      dogId: "asfaf21",
      dogName: "小黑",
    },
    {
      dogId: "afsaf21",
      dogName: "小黄",
    },
    {
      dogId: "asfkgjk12",
      dogName: "狗蛋",
    },
  ];

  const [choosedDog, setChoosedDog] = useState({});

  return (
    <ul>
      {dogLsit.map((el) => (
        <li key={el.dogId} onClick={() => setChoosedDog(el)}>
          {el.dogName}
        </li>
      ))}

      <DogInfo dogInfo={choosedDog} />
    </ul>
  );
}

function DogInfo({ dogInfo }) {
  const { dogId, dogName } = dogInfo;
  /**
   * hook中的useEffect更加直观的告诉react，当那些变化发生时，我希望执行那些对应的操作，所以我们不应该
   * 错误的从组件生命周期的角度去思考hook。
   *
   * 我们将依赖数组设置为空的原因应该是它没有依赖外部变量，而不是你认为这个副作用只挂载的时候执行一次！
   *
   * 所以在写hook时，需要思考的是副作用在什么时候执行，而不是在那个生命周期执行
   */
  useEffect(() => {
    console.log("选中的狗的id为", dogId);
  }, []);
  return (
    <div>
      选中了id为{dogId}的小狗，它的名字叫{dogName}
    </div>
  );
}

function KFC() {
  const [price, setPrice] = useState("12");
  const [times, setTimes] = useState(0);
  return (
    <div>
      <p>
        购买了肯德基90天38元
        早餐会员卡后,选择不同价格的早餐，需要吃多少顿才能回本
      </p>
      <span>选择早餐价位：</span>
      <select
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      >
        <option value="12">12元</option>
        <option value="10">10元</option>
        <option value="9">9元</option>
        <option value="8">8元</option>
        <option value="6">6元</option>
      </select>
      <Button
        onClick={() => {
          setTimes(95 / price);
        }}
      >
        计算
      </Button>

      {times && (
        <span>
          选中了{price}的套餐，需要吃{times}次才能回本
        </span>
      )}
    </div>
  );
}

function App() {
  const [appContext, setAppContext] = useState({
    theme: { color: "red" },
    configuration: { showTips: false },
  });
  return (
    <AppContext.Provider value={[appContext, setAppContext]}>
      <Child />
      <DogList />
      <KFC />
    </AppContext.Provider>
  );
}

function Child() {
  const [appContext] = useContext(AppContext);
  const theme = appContext.theme;
  return <div style={{ color: theme.color }}>我是子组件</div>;
}

function FormDemo() {
  const [form] = Form.useForm();
  return (
    <>
      <Modal
        title="选择tags"
        visible
        onOk={async () => {
          const fieldsValue = await form.validateFields();
          // fieldsValue即为表单内的值
          console.log("okHandle -> fieldsValue", Object.entries(fieldsValue));
          /**
           *
           * select——tag:[
           *  {
           *    select_tag_key:"",
           *    setlect_tag_value:""
           *  }
           * ]
           */
          const res = Object.keys(fieldsValue).map((el) => {
            return (el = {
              select_tag_key: el,
              setlect_tag_value: fieldsValue[el],
            });
          });
          console.log(res);
        }}
      >
        <Form
          form={form}
          onFinish={(value) => {
            console.log(value);
          }}
        >
          {[
            {
              tag_key: "广州",
              tag_value: "海珠,天河",
            },
            {
              tag_key: "深圳",
              tag_value: "福田,南山",
            },
          ].map((el) => {
            return (
              <Form.Item label={el.tag_key} name={el.tag_key}>
                <Select
                  // defaultValue={el.tag_value.split(",")[0]}
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    console.log(value);
                    form.setFieldsValue({ [el.tag_key]: value });
                  }}
                  // value="select_tag"
                  // options={}
                  // onSelect={(value) => onSelectTags(el, value)}
                >
                  {el.tag_value.split(",").map((item) => {
                    return <Option value={item}>{item}</Option>;
                  })}
                </Select>
              </Form.Item>
            );
          })}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

ReactDOM.render(<FormDemo></FormDemo>, document.getElementById("root"));
