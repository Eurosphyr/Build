import React, { useState } from 'react';
import { ScrollView, Pressable, Text } from 'react-native';
import { styles } from '@styles/styleFeed';
import { Header } from '@components/addHeader/header';
import { Container, NameBlue } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import NewsCard from '@components/addNews/news';
import { useNews } from '../hooks/saveHooks';

export function Feed({ navigation }: { navigation: any }) {
    const [isFollowing, setIsFollowing] = useState(true);
    const { news, loading, savedNewsIds, handleSaveNews, handleRemoveNews, handleLoadMore } = useNews(isFollowing);

    return (
        <>
            <Header />
            <Container style={styles.headerTabs}>
                <Pressable
                    style={[styles.tabButton, isFollowing ? styles.tabButtonActive : styles.tabButtonInactive]}
                    onPress={() => setIsFollowing(true)}
                >
                    <NameBlue style={isFollowing ? styles.tabTextActive : styles.tabTextInactive}>Seguindo</NameBlue>
                </Pressable>
                <Pressable
                    style={[styles.tabButton, !isFollowing ? styles.tabButtonActive : styles.tabButtonInactive]}
                    onPress={() => setIsFollowing(false)}
                >
                    <NameBlue style={!isFollowing ? styles.tabTextActive : styles.tabTextInactive}>Todas</NameBlue>
                </Pressable>
            </Container>
            {loading && <Text>Loading...</Text>}
            <ScrollView
                onScroll={({ nativeEvent }) => {
                    const isNearBottom =
                        nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height >= nativeEvent.contentSize.height - 50;
                    if (isNearBottom) {
                        handleLoadMore();
                    }
                }}
                scrollEventThrottle={400}
            >
                <NewsCard
                    news={news}
                    savedNewsIds={savedNewsIds}
                    handleSaveNews={handleSaveNews}
                    handleRemoveNews={(link) => handleRemoveNews({ link })}
                />
            </ScrollView>
            <Footer />
        </>
    );
}
