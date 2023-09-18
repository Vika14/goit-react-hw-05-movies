import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import {
  Container,
  Header,
  List,
  Item,
  Links,
  Main,
} from '../../styled/styled';

const Layout = () => {
  return (
    <Container>
      <Header>
        <List>
          <Item>
            <Links to="/">Home</Links>
          </Item>
          <Item>
            <Links to="/movies">Movies</Links>
          </Item>
        </List>
      </Header>

      <Main>
        <Suspense
          fallback={
            <FallingLines
              color="#4fa94d"
              width="100"
              visible={true}
              ariaLabel="falling-lines-loading"
            />
          }
        >
          <Outlet />
        </Suspense>
      </Main>
    </Container>
  );
};

export default Layout;
