// Use Boxicon Icons

import React from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import AddIcon from '@mui/icons-material/Add';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import LockIcon from '@mui/icons-material/Lock';
import ArticleIcon from '@mui/icons-material/Article';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import CodeIcon from '@mui/icons-material/Code';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import DevicesIcon from '@mui/icons-material/Devices';

export const iconHandler = (iconName?: string): React.ReactNode => {

    if (!iconName) {
        return <AddIcon style={{ color: 'white' }} />
    }

    // Return Icon
    switch (iconName) {
        case "LinkedInIcon":
            return <LinkedInIcon style={{ color: 'white' }} />

        case "GitHubIcon":
            return <GitHubIcon style={{ color: 'white' }} />

        case "AddIcon":
            return <AddIcon style={{ color: 'white' }} />

        case "BookmarkAddedIcon":
            return <BookmarkAddedIcon style={{ color: 'white' }} />

        case "LockIcon":
            return <LockIcon style={{ color: 'white' }} />

        case "ArticleIcon":
            return <ArticleIcon style={{ color: 'white' }} />

        case "TwitterIcon":
            return <TwitterIcon style={{ color: 'white' }} />

        case "FacebookIcon":
            return <FacebookIcon style={{ color: 'white' }} />

        case "CodeIcon":
            return <CodeIcon style={{ color: 'white' }} />

        case "HeadphonesIcon":
            return <HeadphonesIcon style={{ color: 'white' }} />

        case "DevicesIcon":
            return <DevicesIcon style={{ color: 'white' }} />

        default:
            return <AddIcon style={{ color: 'white' }} />
    }
}