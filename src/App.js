import { useState } from "react";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import styled, { ThemeProvider } from "styled-components";
import { darkTeme, lightTeme } from "./utils/Theme";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import AdminHome from "./pages/AdminHome";
import PageNotFound from "./pages/PageNotFound";
import UsersList from "./pages/UsersList";
import History from "./components/History";
import Feedback from "./pages/Feedback";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 5;
  background: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 12px 10px;
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTeme : lightTeme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  {/* <Route path="random" element={<Home type="random" />} /> */}
                  <Route path="trend" element={<Home type="trend" />} />
                  <Route path="tags_study" element={<Home type="tags/?tags=study" />} />
                  <Route path="tags_music" element={<Home type="tags/?tags=music" />} />
                  <Route path="tags_torah" element={<Home type="tags/?tags=torah" />} />
                  <Route path="tags_advertising" element={<Home type="tags/?tags=advertising" />} />
                  <Route path="tags_instructions" element={<Home type="tags/?tags=instructions" />} />
                  <Route path="tags_nature" element={<Home type="tags/?tags=nature" />} />
                  <Route path="tags_recipe" element={<Home type="tags/?tags=recipe" />} />
                  <Route path="tags_company" element={<Home type="tags/?tags=company" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="history" element={<History/>} />
                  <Route path="search" element={<Search />} />
                  <Route path="feedback" element={<Feedback />} />
                  <Route path="signin" element={<SignIn />} />

                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
                
                <Route>
                <Route path="/admin" element={<SignIn />} />
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/admin/users" element={<UsersList />} />
                <Route path="/404" element={<PageNotFound />} />
                <Route path="*" element={<Navigate to="/404"/>} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
