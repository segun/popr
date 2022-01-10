import React from "react";
import { Col, Row } from "react-bootstrap";

const PullRequestsComponent = (props) => {
    const {pullRequests, onMoreInfoClicked}
  return (
    <div>
      <Row>
        <Col xs={12}>
          <Row style={{ marginBottom: "10px" }}>
            <Col xs={3} style={{ fontWeight: "bold" }}>
              Title
            </Col>
            <Col xs={3} style={{ fontWeight: "bold" }}>
              Created On
            </Col>
            <Col xs={3} style={{ fontWeight: "bold" }}>
              Merged On
            </Col>
            <Col xs={3}></Col>
          </Row>        
        </Col>
      </Row>
    </div>
  );
};


{
    "url": "https://api.github.com/repos/MetaMask/metamask-extension/pulls/13237",
    "id": 815836503,
    "node_id": "PR_kwDOAoEEns4woK1X",
    "html_url": "https://github.com/MetaMask/metamask-extension/pull/13237",
    "diff_url": "https://github.com/MetaMask/metamask-extension/pull/13237.diff",
    "patch_url": "https://github.com/MetaMask/metamask-extension/pull/13237.patch",
    "issue_url": "https://api.github.com/repos/MetaMask/metamask-extension/issues/13237",
    "number": 13237,
    "state": "closed",
    "locked": true,
    "title": "[Hotfix] track anonymous events appropriately",
    "user": {
        "login": "brad-decker",
        "id": 4448075,
        "node_id": "MDQ6VXNlcjQ0NDgwNzU=",
        "avatar_url": "https://avatars.githubusercontent.com/u/4448075?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/brad-decker",
        "html_url": "https://github.com/brad-decker",
        "followers_url": "https://api.github.com/users/brad-decker/followers",
        "following_url": "https://api.github.com/users/brad-decker/following{/other_user}",
        "gists_url": "https://api.github.com/users/brad-decker/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/brad-decker/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/brad-decker/subscriptions",
        "organizations_url": "https://api.github.com/users/brad-decker/orgs",
        "repos_url": "https://api.github.com/users/brad-decker/repos",
        "events_url": "https://api.github.com/users/brad-decker/events{/privacy}",
        "received_events_url": "https://api.github.com/users/brad-decker/received_events",
        "type": "User",
        "site_admin": false
    },
    "body": "in #12503 i changed the `METAMETRICS_ANONYMOUS_ID` value to `''` from `'\"\"'` under the advisement of Mixpanel. This resulted in the unforeseen consequence of segment stripping the id field from the payload as an `undefined` value. This resulted in a large number of `userId or anonymousId` must be provided errors. Which was cared for in https://github.com/MetaMask/metamask-extension/commit/c9baf39c4da063a7f1722fc11ca009ec67fcbf73#diff-7b8d320333af0791e309c08599608d1e6f9a97e19792e32cf7a058c4f35a6022R18-R74 -- but the unfortunate result of that is that all sensitiveProperties in event payloads have not resulted in tracked anonymous events since my change went into place. Those events have been lost forever. \r\n\r\nMixpanel is now properly transforming the `0x00` id to the appropriate anonymous event so we can rely upon it again. this change should get us back to tracking that sensitive data on anonymous events. \r\n",
    "created_at": "2022-01-06T20:57:21Z",
    "updated_at": "2022-01-07T03:29:19Z",
    "closed_at": "2022-01-07T03:29:07Z",
    "merged_at": "2022-01-07T03:29:06Z",
    "merge_commit_sha": "e333eb4628868e2731b0fced4a583aac6af84ca7",
    "assignee": null,
    "assignees": [],
    "requested_reviewers": [],
    "requested_teams": [],
    "labels": [],
    "milestone": null,
    "draft": false,
    "commits_url": "https://api.github.com/repos/MetaMask/metamask-extension/pulls/13237/commits",
    "review_comments_url": "https://api.github.com/repos/MetaMask/metamask-extension/pulls/13237/comments",
    "review_comment_url": "https://api.github.com/repos/MetaMask/metamask-extension/pulls/comments{/number}",
    "comments_url": "https://api.github.com/repos/MetaMask/metamask-extension/issues/13237/comments",
    "statuses_url": "https://api.github.com/repos/MetaMask/metamask-extension/statuses/349152d5d6a70aabe59c02dc17e7e2c79bce778a",
    "head": {
        "label": "MetaMask:fix-segment-thing",
        "ref": "fix-segment-thing",
        "sha": "349152d5d6a70aabe59c02dc17e7e2c79bce778a",
        "user": {
            "login": "MetaMask",
            "id": 11744586,
            "node_id": "MDEyOk9yZ2FuaXphdGlvbjExNzQ0NTg2",
            "avatar_url": "https://avatars.githubusercontent.com/u/11744586?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/MetaMask",
            "html_url": "https://github.com/MetaMask",
            "followers_url": "https://api.github.com/users/MetaMask/followers",
            "following_url": "https://api.github.com/users/MetaMask/following{/other_user}",
            "gists_url": "https://api.github.com/users/MetaMask/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/MetaMask/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/MetaMask/subscriptions",
            "organizations_url": "https://api.github.com/users/MetaMask/orgs",
            "repos_url": "https://api.github.com/users/MetaMask/repos",
            "events_url": "https://api.github.com/users/MetaMask/events{/privacy}",
            "received_events_url": "https://api.github.com/users/MetaMask/received_events",
            "type": "Organization",
            "site_admin": false
        },
        "repo": {
            "id": 42009758,
            "node_id": "MDEwOlJlcG9zaXRvcnk0MjAwOTc1OA==",
            "name": "metamask-extension",
            "full_name": "MetaMask/metamask-extension",
            "private": false,
            "owner": {
                "login": "MetaMask",
                "id": 11744586,
                "node_id": "MDEyOk9yZ2FuaXphdGlvbjExNzQ0NTg2",
                "avatar_url": "https://avatars.githubusercontent.com/u/11744586?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/MetaMask",
                "html_url": "https://github.com/MetaMask",
                "followers_url": "https://api.github.com/users/MetaMask/followers",
                "following_url": "https://api.github.com/users/MetaMask/following{/other_user}",
                "gists_url": "https://api.github.com/users/MetaMask/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/MetaMask/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/MetaMask/subscriptions",
                "organizations_url": "https://api.github.com/users/MetaMask/orgs",
                "repos_url": "https://api.github.com/users/MetaMask/repos",
                "events_url": "https://api.github.com/users/MetaMask/events{/privacy}",
                "received_events_url": "https://api.github.com/users/MetaMask/received_events",
                "type": "Organization",
                "site_admin": false
            },
            "html_url": "https://github.com/MetaMask/metamask-extension",
            "description": ":globe_with_meridians: :electric_plug: The MetaMask browser extension enables browsing Ethereum blockchain enabled websites",
            "fork": false,
            "url": "https://api.github.com/repos/MetaMask/metamask-extension",
            "forks_url": "https://api.github.com/repos/MetaMask/metamask-extension/forks",
            "keys_url": "https://api.github.com/repos/MetaMask/metamask-extension/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/MetaMask/metamask-extension/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/MetaMask/metamask-extension/teams",
            "hooks_url": "https://api.github.com/repos/MetaMask/metamask-extension/hooks",
            "issue_events_url": "https://api.github.com/repos/MetaMask/metamask-extension/issues/events{/number}",
            "events_url": "https://api.github.com/repos/MetaMask/metamask-extension/events",
            "assignees_url": "https://api.github.com/repos/MetaMask/metamask-extension/assignees{/user}",
            "branches_url": "https://api.github.com/repos/MetaMask/metamask-extension/branches{/branch}",
            "tags_url": "https://api.github.com/repos/MetaMask/metamask-extension/tags",
            "blobs_url": "https://api.github.com/repos/MetaMask/metamask-extension/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/MetaMask/metamask-extension/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/MetaMask/metamask-extension/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/MetaMask/metamask-extension/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/MetaMask/metamask-extension/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/MetaMask/metamask-extension/languages",
            "stargazers_url": "https://api.github.com/repos/MetaMask/metamask-extension/stargazers",
            "contributors_url": "https://api.github.com/repos/MetaMask/metamask-extension/contributors",
            "subscribers_url": "https://api.github.com/repos/MetaMask/metamask-extension/subscribers",
            "subscription_url": "https://api.github.com/repos/MetaMask/metamask-extension/subscription",
            "commits_url": "https://api.github.com/repos/MetaMask/metamask-extension/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/MetaMask/metamask-extension/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/MetaMask/metamask-extension/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/MetaMask/metamask-extension/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/MetaMask/metamask-extension/contents/{+path}",
            "compare_url": "https://api.github.com/repos/MetaMask/metamask-extension/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/MetaMask/metamask-extension/merges",
            "archive_url": "https://api.github.com/repos/MetaMask/metamask-extension/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/MetaMask/metamask-extension/downloads",
            "issues_url": "https://api.github.com/repos/MetaMask/metamask-extension/issues{/number}",
            "pulls_url": "https://api.github.com/repos/MetaMask/metamask-extension/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/MetaMask/metamask-extension/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/MetaMask/metamask-extension/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/MetaMask/metamask-extension/labels{/name}",
            "releases_url": "https://api.github.com/repos/MetaMask/metamask-extension/releases{/id}",
            "deployments_url": "https://api.github.com/repos/MetaMask/metamask-extension/deployments",
            "created_at": "2015-09-06T16:34:48Z",
            "updated_at": "2022-01-10T06:33:02Z",
            "pushed_at": "2022-01-10T02:52:43Z",
            "git_url": "git://github.com/MetaMask/metamask-extension.git",
            "ssh_url": "git@github.com:MetaMask/metamask-extension.git",
            "clone_url": "https://github.com/MetaMask/metamask-extension.git",
            "svn_url": "https://github.com/MetaMask/metamask-extension",
            "homepage": "https://metamask.io",
            "size": 169609,
            "stargazers_count": 6812,
            "watchers_count": 6812,
            "language": "JavaScript",
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": false,
            "has_pages": true,
            "forks_count": 2611,
            "mirror_url": null,
            "archived": false,
            "disabled": false,
            "open_issues_count": 1104,
            "license": {
                "key": "other",
                "name": "Other",
                "spdx_id": "NOASSERTION",
                "url": null,
                "node_id": "MDc6TGljZW5zZTA="
            },
            "allow_forking": true,
            "is_template": false,
            "topics": [
                "brave",
                "chrome",
                "dapp",
                "dapp-developers",
                "edge",
                "ethereum",
                "extension",
                "firefox",
                "opera"
            ],
            "visibility": "public",
            "forks": 2611,
            "open_issues": 1104,
            "watchers": 6812,
            "default_branch": "develop"
        }
    },
    "base": {
        "label": "MetaMask:develop",
        "ref": "develop",
        "sha": "10dc686505746389f72dcc11fd45fd89df74cd6e",
        "user": {
            "login": "MetaMask",
            "id": 11744586,
            "node_id": "MDEyOk9yZ2FuaXphdGlvbjExNzQ0NTg2",
            "avatar_url": "https://avatars.githubusercontent.com/u/11744586?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/MetaMask",
            "html_url": "https://github.com/MetaMask",
            "followers_url": "https://api.github.com/users/MetaMask/followers",
            "following_url": "https://api.github.com/users/MetaMask/following{/other_user}",
            "gists_url": "https://api.github.com/users/MetaMask/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/MetaMask/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/MetaMask/subscriptions",
            "organizations_url": "https://api.github.com/users/MetaMask/orgs",
            "repos_url": "https://api.github.com/users/MetaMask/repos",
            "events_url": "https://api.github.com/users/MetaMask/events{/privacy}",
            "received_events_url": "https://api.github.com/users/MetaMask/received_events",
            "type": "Organization",
            "site_admin": false
        },
        "repo": {
            "id": 42009758,
            "node_id": "MDEwOlJlcG9zaXRvcnk0MjAwOTc1OA==",
            "name": "metamask-extension",
            "full_name": "MetaMask/metamask-extension",
            "private": false,
            "owner": {
                "login": "MetaMask",
                "id": 11744586,
                "node_id": "MDEyOk9yZ2FuaXphdGlvbjExNzQ0NTg2",
                "avatar_url": "https://avatars.githubusercontent.com/u/11744586?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/MetaMask",
                "html_url": "https://github.com/MetaMask",
                "followers_url": "https://api.github.com/users/MetaMask/followers",
                "following_url": "https://api.github.com/users/MetaMask/following{/other_user}",
                "gists_url": "https://api.github.com/users/MetaMask/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/MetaMask/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/MetaMask/subscriptions",
                "organizations_url": "https://api.github.com/users/MetaMask/orgs",
                "repos_url": "https://api.github.com/users/MetaMask/repos",
                "events_url": "https://api.github.com/users/MetaMask/events{/privacy}",
                "received_events_url": "https://api.github.com/users/MetaMask/received_events",
                "type": "Organization",
                "site_admin": false
            },
            "html_url": "https://github.com/MetaMask/metamask-extension",
            "description": ":globe_with_meridians: :electric_plug: The MetaMask browser extension enables browsing Ethereum blockchain enabled websites",
            "fork": false,
            "url": "https://api.github.com/repos/MetaMask/metamask-extension",
            "forks_url": "https://api.github.com/repos/MetaMask/metamask-extension/forks",
            "keys_url": "https://api.github.com/repos/MetaMask/metamask-extension/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/MetaMask/metamask-extension/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/MetaMask/metamask-extension/teams",
            "hooks_url": "https://api.github.com/repos/MetaMask/metamask-extension/hooks",
            "issue_events_url": "https://api.github.com/repos/MetaMask/metamask-extension/issues/events{/number}",
            "events_url": "https://api.github.com/repos/MetaMask/metamask-extension/events",
            "assignees_url": "https://api.github.com/repos/MetaMask/metamask-extension/assignees{/user}",
            "branches_url": "https://api.github.com/repos/MetaMask/metamask-extension/branches{/branch}",
            "tags_url": "https://api.github.com/repos/MetaMask/metamask-extension/tags",
            "blobs_url": "https://api.github.com/repos/MetaMask/metamask-extension/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/MetaMask/metamask-extension/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/MetaMask/metamask-extension/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/MetaMask/metamask-extension/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/MetaMask/metamask-extension/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/MetaMask/metamask-extension/languages",
            "stargazers_url": "https://api.github.com/repos/MetaMask/metamask-extension/stargazers",
            "contributors_url": "https://api.github.com/repos/MetaMask/metamask-extension/contributors",
            "subscribers_url": "https://api.github.com/repos/MetaMask/metamask-extension/subscribers",
            "subscription_url": "https://api.github.com/repos/MetaMask/metamask-extension/subscription",
            "commits_url": "https://api.github.com/repos/MetaMask/metamask-extension/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/MetaMask/metamask-extension/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/MetaMask/metamask-extension/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/MetaMask/metamask-extension/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/MetaMask/metamask-extension/contents/{+path}",
            "compare_url": "https://api.github.com/repos/MetaMask/metamask-extension/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/MetaMask/metamask-extension/merges",
            "archive_url": "https://api.github.com/repos/MetaMask/metamask-extension/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/MetaMask/metamask-extension/downloads",
            "issues_url": "https://api.github.com/repos/MetaMask/metamask-extension/issues{/number}",
            "pulls_url": "https://api.github.com/repos/MetaMask/metamask-extension/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/MetaMask/metamask-extension/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/MetaMask/metamask-extension/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/MetaMask/metamask-extension/labels{/name}",
            "releases_url": "https://api.github.com/repos/MetaMask/metamask-extension/releases{/id}",
            "deployments_url": "https://api.github.com/repos/MetaMask/metamask-extension/deployments",
            "created_at": "2015-09-06T16:34:48Z",
            "updated_at": "2022-01-10T06:33:02Z",
            "pushed_at": "2022-01-10T02:52:43Z",
            "git_url": "git://github.com/MetaMask/metamask-extension.git",
            "ssh_url": "git@github.com:MetaMask/metamask-extension.git",
            "clone_url": "https://github.com/MetaMask/metamask-extension.git",
            "svn_url": "https://github.com/MetaMask/metamask-extension",
            "homepage": "https://metamask.io",
            "size": 169609,
            "stargazers_count": 6812,
            "watchers_count": 6812,
            "language": "JavaScript",
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": false,
            "has_pages": true,
            "forks_count": 2611,
            "mirror_url": null,
            "archived": false,
            "disabled": false,
            "open_issues_count": 1104,
            "license": {
                "key": "other",
                "name": "Other",
                "spdx_id": "NOASSERTION",
                "url": null,
                "node_id": "MDc6TGljZW5zZTA="
            },
            "allow_forking": true,
            "is_template": false,
            "topics": [
                "brave",
                "chrome",
                "dapp",
                "dapp-developers",
                "edge",
                "ethereum",
                "extension",
                "firefox",
                "opera"
            ],
            "visibility": "public",
            "forks": 2611,
            "open_issues": 1104,
            "watchers": 6812,
            "default_branch": "develop"
        }
    },
    "_links": {
        "self": {
            "href": "https://api.github.com/repos/MetaMask/metamask-extension/pulls/13237"
        },
        "html": {
            "href": "https://github.com/MetaMask/metamask-extension/pull/13237"
        },
        "issue": {
            "href": "https://api.github.com/repos/MetaMask/metamask-extension/issues/13237"
        },
        "comments": {
            "href": "https://api.github.com/repos/MetaMask/metamask-extension/issues/13237/comments"
        },
        "review_comments": {
            "href": "https://api.github.com/repos/MetaMask/metamask-extension/pulls/13237/comments"
        },
        "review_comment": {
            "href": "https://api.github.com/repos/MetaMask/metamask-extension/pulls/comments{/number}"
        },
        "commits": {
            "href": "https://api.github.com/repos/MetaMask/metamask-extension/pulls/13237/commits"
        },
        "statuses": {
            "href": "https://api.github.com/repos/MetaMask/metamask-extension/statuses/349152d5d6a70aabe59c02dc17e7e2c79bce778a"
        }
    },
    "author_association": "MEMBER",
    "auto_merge": null,
    "active_lock_reason": null
}

export default PullRequestsComponent;
