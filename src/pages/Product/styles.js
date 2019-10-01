import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  .ant-carousel .slick-slide {
    text-align: center;
    overflow: hidden;

    img {
      display: block;
      margin: 0 auto;
    }
  }

  .headerPage {
    margin-top: 50px;
  }

  .ant-carousel .slick-slide h3 {
    color: #fff;
  }

  .ant-carousel .slick-dots li.slick-active button {
    background: #000;
  }

  .ant-carousel .slick-dots li button {
    background: #000;
  }
`;

export const HeaderPage = styled.div`
  display: flex;
  padding: 30px 0;

  img {
    max-width: 500px;
  }

  .desc-produto {
    .vendidos {
      color: #ccc;
    }

    h1 {
      font-size: 26px;
    }
  }
`;
