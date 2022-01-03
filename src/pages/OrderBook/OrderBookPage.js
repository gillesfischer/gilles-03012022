import './OrderBookPage.css';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { websocketURL, wsSubscribeMsg } from '../../config/api';
import ToggleButton from '../../components/ToggleButton/ToggleButton';
import Spread from '../../components/Spread/Spread';
import OrderbookContext from '../../context/OrderBookContext';
import Orders from '../../components/Orders/Orders';
import Modal from 'react-modal';
import {
  createDataArray,
  updateDataArray,
} from '../../helpers/helpersBookorder';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--background-color)',
    width: '50%',
    height: '50%',
  },
};

let ws;
const tableSizeMax = 30;
const tableSizeMin = 10;
Modal.setAppElement('#root');

function OrderBookPage() {
  const { toggleMarket, market } = useContext(OrderbookContext);
  const [asks, setAsks] = useState([]);
  const [bids, setBids] = useState([]);
  const [spread, setSpread] = useState(0);
  const [tableMaxSize, setTableMaxSize] = useState(tableSizeMax);
  const [reverseBottomTable, setReverseBottomTable] = useState(false);
  const [displayTableTopBorder, setDisplayTableTopBorder] = useState(true);
  const [hasSubscribed, setHasSubscribe] = useState(false);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const asksRef = React.createRef();
  const bidsRef = React.createRef();
  const maxDisplayRef = React.createRef();
  maxDisplayRef.current = tableSizeMax;

  useEffect(() => {
    initaliseWebsocket();

    updateLayout();
    return () => {
      closeWebsocket();
    };
  }, []);

  useEffect(() => {
    if (asks.length > 0 && bids.length > 0) {
      setSpread(asks[0].price - bids[0].price);
    }
  }, [asks, bids]);

  const initaliseWebsocket = () => {
    ws = new WebSocket(websocketURL);

    ws.onopen = () => {
      console.log(`websocket connected: ${websocketURL}`);
      subscribeToWsEvent();
      setHasSubscribe(true);
    };
    ws.onmessage = ({ data }) => {
      if (ws.readyState === 0) return;
      let jsonData = JSON.parse(data);
      if (jsonData.feed === 'book_ui_1_snapshot') {
        const formatedAndSortedAsks = createDataArray(
          jsonData.asks,
          maxDisplayRef.current
        );
        const formatedAndSortedBids = createDataArray(
          jsonData.bids,
          maxDisplayRef.current
        );

        setSpread(
          formatedAndSortedAsks[0].price - formatedAndSortedBids[0].price
        );
        asksRef.current = formatedAndSortedAsks;
        bidsRef.current = formatedAndSortedBids;
        setAsks(formatedAndSortedAsks);
        setBids(formatedAndSortedBids);
      } else if (jsonData.feed === 'book_ui_1' && !jsonData.event) {
        // console.log('product', jsonData.product_id);
        if (jsonData.asks.length) {
          if (asksRef.current.length > 0) {
            const a = updateDataArray(
              jsonData.asks[0],
              asksRef.current,
              maxDisplayRef.current
            );
            asksRef.current = a;
            setAsks(a);
          }
        }
        if (jsonData.bids.length) {
          if (bidsRef.current.length > 0) {
            const a = updateDataArray(
              jsonData.bids[0],
              bidsRef.current,
              maxDisplayRef.current
            );
            bidsRef.current = a;
            setBids(a);
          }
        }
      }
    };
  };

  const closeWebsocket = () => {
    unsubscribeFromWsEvent();

    if (ws) {
      ws.close(1000, `websocket closed:  ${websocketURL}`);
      ws = null;
    }
  };

  useEffect(() => {
    if (hasSubscribed) {
      subscribeToWsEvent();
    }
  }, [market]);

  const subscribeToWsEvent = () => {
    if (ws && ws.readyState !== 0) {
      ws.send(JSON.stringify(wsSubscribeMsg('subscribe', market)));
    }
  };

  const unsubscribeFromWsEvent = () => {
    if (ws && ws.readyState !== 0) {
      ws.send(JSON.stringify(wsSubscribeMsg('unsubscribe', market)));
    }
  };

  const handleToggleButton = () => {
    unsubscribeFromWsEvent();
    toggleMarket();
    //Susbcrption is Handle in the useEffect to make sure we have the correct value.
  };

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('visibilitychange', onWindowInactive);
    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('visibilitychange', onWindowInactive);
    };
  }, []);

  const onWindowResize = () => {
    window.requestAnimationFrame(() => {
      updateLayout();
    });
  };

  const updateLayout = () => {
    if (window.innerWidth <= 600) {
      setTableMaxSize(tableSizeMin);
      setReverseBottomTable(true);
      setDisplayTableTopBorder(false);
      maxDisplayRef.current = tableSizeMin;
    } else {
      setTableMaxSize(tableSizeMax);
      setReverseBottomTable(false);
      setDisplayTableTopBorder(true);
      maxDisplayRef.current = tableSizeMax;
    }
  };

  const onWindowInactive = () => {
    setModalIsOpen(true);
    closeWebsocket();
  };

  const handleModalReconnect = () => {
    initaliseWebsocket();
    setModalIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={modalIsOpen} style={modalStyles}>
        <div className='modal-container'>
          <div>
            <h1>We stopped the connection to the server</h1>
          </div>
          <div>
            <button onClick={handleModalReconnect}>Reconnect</button>
          </div>
        </div>
      </Modal>
      <div className='title'>
        <Header title='Order Book' />
      </div>
      <div className='mycontainer'>
        <div className='title2'>
          <Header title='Order Book' />
        </div>
        <div className='myheader'>
          <Spread spread={spread}></Spread>
        </div>
        <div className='left-orderbookchart'>
          <Orders
            data={bids}
            reverse={reverseBottomTable}
            maxDisplay={tableMaxSize}
            priceColor='lime'
            displayTableTopBorder={displayTableTopBorder}
          ></Orders>
        </div>
        <div className='right-orderbookchart'>
          <Orders
            data={asks}
            reverse={true}
            maxDisplay={tableMaxSize}
            priceColor='red'
            displayTableTopBorder={true}
          ></Orders>
        </div>
        <div className='myfooter'>
          <ToggleButton
            title='Toggle Feed'
            onClick={() => {
              handleToggleButton();
            }}
          ></ToggleButton>
        </div>
      </div>
    </>
  );
}

export default OrderBookPage;
