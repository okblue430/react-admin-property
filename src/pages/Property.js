import { DataContext } from "contexts/DataContextContainer";
import { useContext, useState } from "react";
import { Card, Col, Radio, Divider, Row, Typography, Button, Modal, Form, Input } from 'antd';
import { StarFilled } from '@ant-design/icons';
const { Title } = Typography;
const { Meta } = Card;

const Property = () => {
    const { allProperties, listedProperties, setListedProperties } = useContext(DataContext)
    const [selItem, setSelItem] = useState(null)
    const [selProperty, setSelProperty] = useState(10000000)
    const [modalOpen, setModalOpen] = useState(false);

    const onFinish = (values) => {
        console.log('Success:', values);
        let newItem = JSON.parse(JSON.stringify(selItem))
        newItem.prices.base_price = values.cost
        newItem.tax_percentage = values.tax
        newItem.total_bedroomse = values.bedrooms
        // console.log("here", JSON.stringify(newItem))
        const findIndex = listedProperties.findIndex(t => t.id === newItem.id)
        const newList = [...listedProperties]
        if (findIndex > 0) {
            newList[findIndex] = newItem
        } else {
            newList.push(newItem)
        }
        setListedProperties(newList)
        closedModal()
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const selectItem = (row) => {
        console.log("sel item ", row)
        setSelItem(row)
        setModalOpen(true)
    }
    const closedModal = () => {
        setModalOpen(false)
        setSelItem(null)
    }
    const onProperty = (e) => {
        const property = e.target.value
        console.log({property})
        switch(property) {
            case 'all':
                setSelProperty(10000000)
                break;
            case 'favorites':
                setSelProperty(2500)
                break;
            case 'offers':
                setSelProperty(3000)
                break;
            case 'accepted':
                setSelProperty(4000)
                break;
            case 'closed':
                setSelProperty(2000)
                break;
            default :
                setSelProperty(10000000)
        }
    }
    const renderModal = () => {
        if (selItem) {
            return (
                <Modal
                    title={selItem.title}
                    centered
                    open={modalOpen}
                    footer={null}
                    onCancel={closedModal}
                >
                    <img alt="example" style={{ width: '100%', objectFit: 'cover' }} src={selItem.display_image} />
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="cost"
                            name="cost"
                            initialValue={selItem.prices.base_price}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="tax percentage"
                            name="tax"
                            initialValue={selItem.tax_percentage}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="bedrooms"
                            name="bedrooms"
                            type="number"
                            initialValue={selItem.total_bedrooms}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            )
        } else {
            return null
        }
    }

    return (
        <>
            <div>
                <Radio.Group onChange={onProperty}>
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="favorites">Favorites</Radio.Button>
                    <Radio.Button value="offers">offers</Radio.Button>
                    <Radio.Button value="accepted">Accepted Offers</Radio.Button>
                    <Radio.Button value="closed">Closed</Radio.Button>
                </Radio.Group>
            </div>
            <div>
                <Row justify="start">
                    {allProperties.length > 0 && allProperties.map((row, key) => {
                        if(Number(row.prices.base_price > selProperty)) return null
                        return (
                            <Col className="mt-2" span={6} key={key}>
                                <Card
                                    hoverable
                                    style={{
                                        width: 240,
                                    }}
                                    cover={<img alt="example" style={{ height: 160, objectFit: 'cover' }} src={row.display_image} />}
                                    onClick={() => selectItem(row)}
                                >
                                    <div className="d-flex justify-space-between align-center">
                                        <div className="font-title">${row.prices.base_price.toLocaleString()}</div>
                                        <div className="d-flex justify-space-between align-center">
                                            <StarFilled twoToneColor="#eb2f96" />
                                            <div className="font-sub">4.5</div>
                                        </div>
                                    </div>
                                    <Meta description={row.address.full} />
                                </Card>
                            </Col>
                        )
                    })}
                </Row>

            </div>
            {renderModal()}
        </>
    )
}

export default Property;