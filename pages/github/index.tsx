import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./auth.module.css";
import Head from "next/head";
import RepositoriesComponent from "./components/repos.component";
import FilterByBranchModal from "./modals/filter-by-branch.modal";
import { AuthProvider } from "./hooks/use-auth.hook";

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
  const [showLoading, setShowLoading] = React.useState(false);

  const router = useRouter();
  const code = router.query.code;
  const state = Math.random() * Number.MAX_SAFE_INTEGER;
  const PER_PAGE = 100;

  const doAuth = async () => {
    if (code !== undefined) {
      setShowLoading(true);
      const result = await axios.get(
        `http://localhost:9999/authenticate/${code}`
      );
      console.log("Error: ", result.data.error);
      console.log("Token: ", result.data.token);
      if (result.data.error) {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=Iv1.967aea4cd2c26675&state=${state}&redirect_uri=http://localhost:3000/github`;
      }
      // get user
      const userResult = await axios.get(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${result.data.token}`,
        },
      });
      const userContext = {
        login: userResult.data.login,
        authToken: result.data.token,
      };

      setUser(userContext);
      setShowLoading(false);
    }
  };

  const getUserRepos = async (type: string, page: number) => {
    if (user.authToken) {
      setShowLoading(true);
      const result = await axios.get(
        `https://api.github.com/user/repos?visibility=${type}&page=${page}&per_page=${PER_PAGE}`,
        {
          headers: {
            Authorization: `token ${user.authToken}`,
          },
        }
      );
      setUserRepos(result.data);
      setDisplayComponent("repos");
      setShowLoading(false);
    }
  };

  const getPullRequests = async (
    owner: string,
    repo: string,
    branch: string,
    page: number
  ) => {
    setShowFilterByBranchModal(false);
    setShowLoading(true);
    setUserRepos([]);
    let url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&base=${branch}&page=${page}&per_page=${PER_PAGE}`;
    if (branch === undefined) {
      url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&page=${page}&per_page=${PER_PAGE}`;
    }

    const result = await axios.get(url, {
      headers: {
        Authorization: `token ${user.authToken}`,
      },
    });
    console.log(result.data);

    const userPRs = result.data.filter((pr) => pr.user.login === user.login);
    console.log(userPRs);

    setPullRequests([...pullRequests, ...userPRs]);
    setDisplayComponent("pull-requests");

    if (result.data.length > 1) {
      getPullRequests(owner, repo, branch, page++);
    }
    setShowLoading(false);
  };

  const selectBranch = async (repo: string, owner: string) => {
    setModalOwner(owner);
    setModalRepo(repo);
    setShowFilterByBranchModal(true);
  };

  React.useEffect(() => {
    doAuth();
  }, [code]);

  React.useEffect(() => {
    getUserRepos("public", 1);
  }, [user.authToken]);

  return (
    <div className="container">
      <Head>
        <title>Proof of Pull Request</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className="p-3">
        <Row style={{ marginBottom: "15px", marginTop: "15px" }}>
          <Col>
            <Button
              onClick={() => getUserRepos("public", 1)}
              variant={isPublicRepo ? "primary" : "secondary"}
            >
              Public Repos
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => getUserRepos("private", 1)}
              variant={isPublicRepo ? "secondary" : "primary"}
            >
              Private Repos
            </Button>
          </Col>
        </Row>

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

          <FilterByBranchModal
            owner={modalOwner}
            repo={modalRepo}
            show={showFilterByBranchModal}
            onHide={() => setShowFilterByBranchModal(false)}
            onGetPullRequestsClick={getPullRequests}
          />
        </AuthProvider>
      </Container>
    </div>
  );
};

export default Auth;
