import { DataContext } from "contexts/DataContextContainer";
import { useContext, useState } from "react";
import { Card, Col, Divider, Row, Typography, Button, Modal  } from 'antd';
import { StarFilled } from '@ant-design/icons';
const { Title } = Typography;
const { Meta } = Card;

const List = () => {
    const { listedProperties } = useContext(DataContext)
    const [selItem, setSelItem] = useState(null)
    const [modalOpen, setModalOpen] = useState(false);
    
    const selectItem = (index) => {
        console.log("sel item ", index)
        setSelItem(listedProperties[index])
        setModalOpen(true)
    }
    const renderModal = () => {
        if(selItem) {
            return (
                <Modal
                    title={selItem.title}
                    centered
                    open={modalOpen}
                    onOk={() => setModalOpen(false)}
                    onCancel={() => setModalOpen(false)}
                >
                    <img alt="example" style={{width: '100%',objectFit: 'cover'}} src={selItem.display_image} />
                    <div className="d-flex justify-space-between align-center">
                        <div className="font-title">${selItem.prices.base_price.toLocaleString()}</div>
                        <div className="d-flex justify-space-between align-center">
                            <StarFilled twoToneColor="#eb2f96"/>
                            <div className="font-sub">4.5</div>
                        </div>
                    </div>
                    <Meta description={selItem.description} />
                    <Divider />
                    <Meta description={selItem.address.full} />
                </Modal>
            )
        }else{
            return null
        }
    }

    return (
        <>
            <div>button area</div>
            <div>
                <Row justify="start">
                    {listedProperties.length > 0 && listedProperties.map( (row, key) => {
                        return (
                            <Col className="mt-2" span={6} key={key}>
                                <Card
                                    hoverable
                                    style={{
                                        width: 240,
                                    }}
                                    cover={<img alt="example" style={{height: 160,objectFit: 'cover'}} src={row.display_image} />}
                                    onClick={()=>selectItem(key)}
                                >
                                    <div className="d-flex justify-space-between align-center">
                                        <div className="font-title">${row.prices.base_price.toLocaleString()}</div>
                                        <div className="d-flex justify-space-between align-center">
                                            <StarFilled twoToneColor="#eb2f96"/>
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

export default List;