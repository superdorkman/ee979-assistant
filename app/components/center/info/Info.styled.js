import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 670px;
  border-radius: 3px;
  background-color: #fff;
  margin-right: 10px;
  padding: 30px;
  

.info-top {
    display: flex;
    flex: 1;

    em {
        // font-family: 'forNumber', '微软雅黑', '宋体', sans-serif;
        font-weight: 900;
        color: #333;
    }

    .avail {
        display: flex;
        flex-direction: column;
        align-items: center;

        .label {
            font-size: 12px;
            color: #333333;
            margin-top: 10px;

            button {
                color: #e41314;
                margin-left: 20px;
            }
        }
        em {
            font-size: 36px;
            line-height: 30px;
        }
    }

    .total {
        flex: 1;
        font-size: 12px;
        color: #333;
        margin-left: 40px;

        em {
            font-size: 16px;
        }
    }

    .fund-ctrl {
        display: flex;
        flex-direction: column;
        align-items: center;

        .withdraw {
           width: 95px;
           height: 30px;
           background-color: #e41314;
           font-size: 14px;
           color: #fff;
           border-radius: 5px;
           margin-bottom: 10px;
        }

        .record {
            font-size: 12px;
            color: #666;
        }
    }
}

.info-bottom {
    height: 80px;
    display: flex;
    color: #333;
    font-size: 12px;

    .list {
        flex: 1;
        display: flex;
        justify-content: space-between;

        li {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            position: relative;
            outline: none;
            cursor: pointer;

            .badge {
                position: absolute;
                top: 0;
                right: -4px;
                padding: 2px 4px;
                background-color: #e41314;
                color: #fff;
                font-size: 12px;
                border-radius: 7px;
                min-width: 22px;
                text-align: center;
                transform: scale(.85, .8);
            }
        }

        .thumb {
            width: 56px;
            height: 56px;
            background-color: #f7f7f7;
            border-radius: 50%;
            padding: 15px;

            svg {
                width: 100%;
                height: 100%;
                fill: #666;
            }

            &.msg {
                background-position: 0 -40px;
            }
            &.buy {
                background-position: -56px -40px;
            }
            &.sale {
                background-position: -112px -40px;
            }
            &.sold {
                background-position: -168px -40px;
            }
        }
    }

    .log {
        width: 190px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;

        span {
            margin-bottom: 2px;
        }

        a {
            color: #e41314;
            margin-top: 6px;
        }
    }
}
`;
