import { Client, TablesDB, ID, Query } from "react-native-appwrite";

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!; // tableId (ex: "metrics")

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(PROJECT_ID);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie, movies: Movie[]) => {
    try {
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [
                Query.equal("searchTerm", query),
                //Query.equal("movie_id", movie.id),
            ]
        });

        /*const resultMovieId = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [
                Query.equal("searchTerm", query),
                Query.equal("movie_id", movies[1].id),
            ]
        });*/

        if (result.rows.length > 0) {
            const existing = result.rows[0] as any;

            await tablesDB.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: existing.$id,
                data: {
                    count: (existing.count ?? 0) + 1,
                },
            });
        } else {
            await tablesDB.createRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: ID.unique(),
                data: {
                    searchTerm: query,
                    movie_id: movie.id,
                    title: movie.title,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                },
            });
        }
    } catch (error) {
        console.error("Error updating search count:", error);
        throw error;
    }
};

export const getTrendingMoviesOld = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [Query.limit(5), Query.orderDesc("count")],
        });

        return result.rows as unknown as TrendingMovie[];
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [Query.limit(5), Query.orderDesc("count")],
        });

        return (result.rows as any[]).map((row) => ({
            $id: row.$id,
            searchTerm: row.searchTerm,
            movie_id: row.movie_id,
            title: row.title,
            count: row.count,
            poster_url: row.poster_url,
        })) as unknown as TrendingMovie[];
    } catch (error) {
        console.error(error);
        return undefined;
    }
};


