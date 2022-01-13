import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./auth.module.css";
import Head from "next/head";
import RepositoriesComponent from "./components/repos.component";
import FilterByBranchModal from "./modals/filter-by-branch.modal";
import { AuthProvider } from "../../utils/hooks/use-auth.hook";
import PullRequestsComponent from "./components/pull.requests.component";

const Auth = () => {
  const [user, setUser] = React.useState({
    login: undefined,
    authToken: undefined,
  });
  const [userRepos, setUserRepos] = React.useState([]);
  const [pullRequests, setPullRequests] = React.useState([]);
  const [isPublicRepo, setPublicRepo] = React.useState(true);
  const [displayComponent, setDisplayComponent] = React.useState("repos");
  const [showFilterByBranchModal, setShowFilterByBranchModal] =
    React.useState(false);
  const [modalOwner, setModalOwner] = React.useState("");
  const [modalRepo, setModalRepo] = React.useState("");
  const [modalFullRepoName, setModalFullRepoName] = React.useState("");
  const [showLoading, setShowLoading] = React.useState(false);
  const [searchEnabled, setSearchEnabled] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState("");

  const router = useRouter();
  const code = router.query.code;
  const state = Math.random() * Number.MAX_SAFE_INTEGER;
  const PER_PAGE = 100;

  const searchReposUrl = process.env.NEXT_PUBLIC_API_SEARCH_REPOSITORIES_URL;
  const authUrl = process.env.NEXT_PUBLIC_API_AUTHORIZE_URL;
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;
  const userApiUrl = process.env.NEXT_PUBLIC_USER_API_URL;
  const userReposApiUrl = process.env.NEXT_PUBLIC_API_USER_REPOS_URL;

  const searchPullRequests = async (
    branch: string,
    repo: string,
    keywords: string,
    page = 1
  ) => {
    setUserRepos([]);
    setDisplayComponent("pull-requests");
    setShowFilterByBranchModal(false);
    setShowLoading(true);
    const q = `${keywords ? `${keywords} ` : ""}is:pr ${
      branch === "all" ? "" : `base:${branch}`
    } is:closed repo:${repo} author:${user.login}`;

    const url = `https://api.github.com/search/issues?q=${q}&page=${page}&per_page=${PER_PAGE}`;
    const headers = {
      Authorization: `token ${user.authToken}`,
    };

    const result = await axios.get(url, { headers: headers });

    setPullRequests(result.data.items);
    setShowLoading(false);
  };

  const selectBranch = async (
    repo: string,
    fullRepoName: string,
    owner: string
  ) => {
    setModalOwner(owner);
    setModalRepo(repo);
    setModalFullRepoName(fullRepoName);
    setShowFilterByBranchModal(true);
  };

  const searchFormChanged = async (e) => {
    const value = e.target.value;
    setSearchKey(value);
  };

  const searchRepo = async () => {
    setPullRequests([]);
    setDisplayComponent("repos");
    setShowLoading(true);
    setSearchEnabled(false);

    const q = `${searchKey} in:name,description`;
    const url = `${searchReposUrl}?q=${q}&per_page=${PER_PAGE}`;
    const headers = {
      Authorization: `token ${user.authToken}`,
    };

    const result = await axios.get(url, { headers: headers });
    setUserRepos(result.data.items);
    setShowLoading(false);
    setSearchEnabled(true);
  };

  React.useEffect(() => {
    const doAuth = async () => {
      if (code !== undefined) {
        setShowLoading(true);

        const result = await axios.get(`/api/github/${code}/auth`);
        if (result.data.token.indexOf("expired") >= 0) {
          setShowLoading(false);
          window.location.href = `${authUrl}?client_id=${clientId}&state=${state}&redirect_uri=${redirectUrl}`;
        } else {
          // get user
          const accessToken = result.data.token.split("=")[1].split('&')[0];
          const userResult = await axios.get(`${userApiUrl}`, {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          });
          const userContext = {
            login: userResult.data.login,
            authToken: accessToken,
          };

          setUser(userContext);
          setShowLoading(false);
        }        
      }
    };

    doAuth();
  }, [code]);

  const getUserRepos = async (page: number) => {
    if (user.authToken) {
      setPullRequests([]);
      setDisplayComponent("repos");
      setShowLoading(true);
      setSearchEnabled(false);
      const result = await axios.get(
        `${userReposApiUrl}?page=${page}&per_page=${PER_PAGE}`,
        {
          headers: {
            Authorization: `token ${user.authToken}`,
          },
        }
      );
      setUserRepos(result.data);
      setShowLoading(false);
      setSearchEnabled(true);
    }
  };

  React.useEffect(() => {
    getUserRepos(1);
  }, [user.authToken]);

  return (
    <div className="container">
      <Head>
        <title>Proof of Pull Request</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className="p-3">
        <Container className="p-3">
          {displayComponent === "repos" && (
            <Row style={{ marginBottom: "15px", marginTop: "15px" }}>
              <Col xs={9}>
                <Form.Group>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Not listed? Search"
                    onChange={searchFormChanged}
                    disabled={!searchEnabled}
                  />
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Button onClick={() => searchRepo()} variant="primary">
                  Search
                </Button>
              </Col>
            </Row>
          )}
        </Container>
        <Row>
          {showLoading && (
            <div className="text-center">
              <div
                className="spinner-border"
                role="status"
                style={{ width: "6rem", height: "6rem" }}
              ></div>
            </div>
          )}
        </Row>
        <AuthProvider auth={user}>
          {displayComponent === "repos" && (
            <RepositoriesComponent
              userRepos={userRepos}
              onPullRequestsClick={selectBranch}
            />
          )}

          {displayComponent === "pull-requests" && (
            <PullRequestsComponent pullRequests={pullRequests} />
          )}

          <FilterByBranchModal
            owner={modalOwner}
            repo={modalRepo}
            fullRepoName={modalFullRepoName}
            show={showFilterByBranchModal}
            onHide={() => setShowFilterByBranchModal(false)}
            onGetPullRequestsClick={searchPullRequests}
          />
        </AuthProvider>
      </Container>
    </div>
  );
};

export default Auth;
