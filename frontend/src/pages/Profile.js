import React, {useEffect, useState} from 'react';
import {getProfile} from "../apis/ApiService";
import {useSelector} from "react-redux";
import S3Upload from "../components/common/S3Upload";
import { QrBox, QR, ProfileImg, LeftContainer, RightContainer, ProfileBox} from '../styles/ProfileStyle';
import { MainStyle } from "../styles/Globalstyle";
import ProfileTab from "../components/profile/ProfileTab";

function Profile() {
    const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0] );
    const [emp, setEmp] = useState(
      { deptName: null, name: null, extensionNum: null, rankName: null, profilePath: null, qrPath: null }
    );

    useEffect(() => {
        getProfile(empNo).then(response => {
            setEmp(response);
        })
    }, []);

    return (
        <MainStyle>
            <LeftContainer>
              <ProfileImg src={ emp.profilePath } />
            </LeftContainer>
            <RightContainer>
              <ProfileBox>
                <ProfileTab />
              </ProfileBox>
              {/*<VerticalTabs />*/}
            </RightContainer>
            <QrBox>
                <a href={ emp.qrPath }><QR>QR code</QR></a>
            </QrBox>
            <S3Upload/>
        </MainStyle>
    );
}
export default Profile;
